'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface PublishActionParams {
  slug: string;
}

export async function publishSection({ slug }: PublishActionParams) {
  const supabase = await createClient();

  try {
    // 1. Obtener usuario
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw new Error(`Auth error: ${authError.message}`);
    if (!user) throw new Error('Usuario no autenticado');

    // 2. Obtener sitio del usuario
    const { data: site, error: siteErr } = await supabase
      .from('sites')
      .select('id, is_published')
      .eq('user_id', user.id)
      .single();
    
    if (siteErr) {
      console.error('Site error:', siteErr);
      throw new Error('No se pudo obtener el sitio del usuario');
    }
    if (!site) {
      throw new Error('No se encontró un sitio para este usuario');
    }

    // 3. Obtener sección - Primero verificar si existe
    const { data: sections, error: secErr } = await supabase
      .from('sections')
      .select('id, name, is_published')
      .eq('slug', slug)
      .eq('site_id', site.id);
    
    if (secErr) {
      console.error('Section error:', secErr);
      throw new Error('Error al buscar la sección');
    }
    
    if (!sections || sections.length === 0) {
      throw new Error(`No se encontró una sección con el slug: ${slug}`);
    }
    
    if (sections.length > 1) {
      console.warn(`Múltiples secciones encontradas para slug: ${slug}. Usando la primera.`);
    }
    
    const section = sections[0];

    // 4. Verificar si la sección ya está publicada
    if (section.is_published) {
      console.log(`La sección ${slug} ya está publicada`);
      // Revalidar de todos modos
      revalidatePath('/');
      revalidatePath(`/p/${slug}`);
      return { success: true, message: 'La sección ya estaba publicada' };
    }

    // 5. Marcar sección como publicada
    const { error: updSecErr } = await supabase
      .from('sections')
      .update({ 
        is_published: true, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', section.id);
    
    if (updSecErr) {
      console.error('Update section error:', updSecErr);
      throw new Error('Error al publicar la sección');
    }

    // 6. Marcar sitio como publicado si es necesario
    if (!site.is_published) {
      const { error: updSiteErr } = await supabase
        .from('sites')
        .update({ 
          is_published: true, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', site.id);
      
      if (updSiteErr) {
        console.error('Update site error:', updSiteErr);
        throw new Error('Error al publicar el sitio');
      }
    }

    // 7. Revalidar rutas
    revalidatePath('/');
    revalidatePath(`/p/${slug}`);

    console.log(`Sección ${slug} publicada exitosamente`);
    return { success: true, message: 'Sección publicada correctamente' };

  } catch (error) {
    console.error('Publish error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al publicar';
    return { 
      success: false, 
      error: new Error(errorMessage)
    };
  }
}