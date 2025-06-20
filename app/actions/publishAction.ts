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

    // 2. Obtener sitio
    const { data: site, error: siteErr } = await supabase
      .from('sites')
      .select('id, is_published')
      .eq('user_id', user.id)
      .single();
    if (siteErr) throw siteErr;

    // 3. Obtener sección
    const { data: section, error: secErr } = await supabase
      .from('sections')
      .select('id')
      .eq('slug', slug)
      .eq('site_id', site.id)
      .single();
    if (secErr) throw secErr;

    // 4. Marcar sección publicada
    const { error: updSecErr } = await supabase
      .from('sections')
      .update({ is_published: true, updated_at: new Date().toISOString() })
      .eq('id', section.id);
    if (updSecErr) throw updSecErr;

    // 5. Marcar sitio publicado si necesario
    if (!site.is_published) {
      const { error: updSiteErr } = await supabase
        .from('sites')
        .update({ is_published: true, updated_at: new Date().toISOString() })
        .eq('id', site.id);
      if (updSiteErr) throw updSiteErr;
    }

    // 6. Revalidar
    revalidatePath('/');
    revalidatePath(`/p/${slug}`);

    return { success: true };
  } catch (error) {
    console.error('Publish error:', error);
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}
