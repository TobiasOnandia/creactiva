'use server'

import { createClient } from '@/utils/supabase/server';


export async function saveSite(siteData: {
  sections: any[];
  name?: string;
  slug?: string;
}) {
  const supabase = await createClient();

  try {
    // 1. Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No se encontró usuario');

    // 2. Buscar el sitio existente del usuario
    let { data: existingSite } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Crear o actualizar el sitio
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .upsert({
        id: existingSite?.id, // Usar el ID existente si existe
        user_id: user.id,
        name: siteData.name || existingSite?.name || 'Mi Sitio',
        slug: existingSite?.slug || 'mi-sitio', // Mantener el slug existente
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (siteError) throw siteError;

    // 3. Guardar cada sección
    for (const section of siteData.sections) {
      // Guardar la sección
      const { data: dbSection, error: sectionError } = await supabase
        .from('sections')
        .upsert({
          id: section.id, // Mantener el ID existente
          site_id: site.id,
          name: section.name,
          slug: section.slug,
          is_home: section.isHome,
          order_index: siteData.sections.indexOf(section),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (sectionError) throw sectionError;

      // Guardar los elementos de la sección
      // Obtener los elementos existentes de la sección
      const { data: existingElements } = await supabase
        .from('elements')
        .select('id')
        .eq('section_id', dbSection.id);

      // Crear o actualizar elementos
      if (section.elements?.length > 0) {
        const { error: elementsError } = await supabase
          .from('elements')
          .upsert(
            section.elements.map((element: any) => {
              const elementData: any = {
                section_id: dbSection.id,
                type: element.type,
                config: element.config,
                updated_at: new Date().toISOString()
              };

              // Solo incluir el ID si el elemento ya existe
              if (element.id && element.id !== 'temp_id') {
                elementData.id = element.id;
              }

              return elementData;
            })
          );

        if (elementsError) throw elementsError;
      }

      // Eliminar elementos que ya no existen en la sección
      const currentElementIds = section.elements
        ?.filter((el: { id: string }) => el.id && el.id !== 'temp_id')
        ?.map((el: { id: string }) => el.id) || [];

      const elementsToDelete = existingElements
        ?.filter((el: { id: string }) => !currentElementIds.includes(el.id))
        ?.map((el: { id: string }) => el.id) || [];

      if (elementsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('elements')
          .delete()
          .in('id', elementsToDelete);

        if (deleteError) throw deleteError;
      }

      // Guardar el layout de la sección
      if (section.layout) {
        // Primero buscar si existe un layout para esta sección y dispositivo
        const { data: existingLayout } = await supabase
          .from('layouts')
          .select('id')
          .eq('section_id', dbSection.id)
          .eq('device', 'desktop')
          .single();

        const { error: layoutError } = await supabase
          .from('layouts')
          .upsert({
            id: existingLayout?.id, // Usar el ID existente si existe
            section_id: dbSection.id,
            layout_data: section.layout,
            device: 'desktop', // Por defecto guardamos el layout de desktop
            updated_at: new Date().toISOString()
          });

        if (layoutError) throw layoutError;
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error al guardar:', error);
    return { success: false, error };
  }
}
