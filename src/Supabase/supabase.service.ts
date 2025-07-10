// src/utils/supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }

  async uploadFile(
    localFilePath: string,
    destinationFileName: string,
    folder: 'imagenes' | 'videos',
    bucket: string,
  ): Promise<string> {
    const fileBuffer = fs.readFileSync(localFilePath);
    const contentType = this.detectMimeType(destinationFileName);
    const cleanedFileName = this.cleanFileName(destinationFileName);

    const storagePath = `${folder}/${cleanedFileName}`;

    const { error } = await this.supabase.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) throw new Error(`Error al subir archivo: ${error.message}`);

    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(storagePath);

    return data.publicUrl;
  }

  // En tu SupabaseService
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extraer el nombre del archivo de la URL
      const fileName = fileUrl.split('/').pop()?.split('?')[0];

      if (!fileName) {
        throw new Error('No se pudo extraer el nombre del archivo de la URL');
      }

      const { error } = await this.supabase.storage
        .from(process.env.SUPABASE_BUCKET_IMAGES || '')
        .remove([fileName]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error eliminando archivo:', error);
      throw error;
    }
  }

  private detectMimeType(fileName: string): string {
    const ext = path.extname(fileName).toLowerCase();
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      case '.mp4':
        return 'video/mp4';
      case '.mov':
        return 'video/quicktime';
      case '.webm':
        return 'video/webm';
      default:
        return 'application/octet-stream';
    }
  }

  private cleanFileName(fileName: string): string {
    return fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w.-]+/g, '_');
  }
}
