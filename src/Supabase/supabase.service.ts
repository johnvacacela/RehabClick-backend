import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

@Injectable() // Decorador que indica que la clase SupabaseService es un servicio inyectable, sin esto no se puede instanciar la clase en otro lugar
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }

  async uploadImage(
    localFilePath: string,
    destinationFileName: string,
  ): Promise<string> {
    const fileBuffer = fs.readFileSync(localFilePath);
    const contentType = this.detectMimeType(destinationFileName);

    const cleanedFileName = this.cleanFileName(destinationFileName);

    const { error } = await this.supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .upload(`imagenes/${cleanedFileName}`, fileBuffer, {
        contentType,
        upsert: true,
      });
    if (error) throw new Error(`Error al subir imagen: ${error.message}`);

    const { data } = this.supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .getPublicUrl(`imagenes/${destinationFileName}`);

    return data.publicUrl;
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
      default:
        return 'application/octet-stream';
    }
  }

  private cleanFileName(fileName: string): string {
    return fileName
      .normalize('NFD') // Elimina acentos
      .replace(/[\u0300-\u036f]/g, '') // Elimina caracteres unicode residuales
      .replace(/[^\w.-]+/g, '_'); // Reemplaza espacios y símbolos por "_"
  }
}
