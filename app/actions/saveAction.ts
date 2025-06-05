'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { GridLayout } from '@/types/canvas/LayoutTypes';

export async function saveSite(siteData: {
  sections: {
    id: string;
    name: string;
    slug: string;
    elements: any[];
    layout: GridLayout[];
    is_home?: boolean;
  }[];
  name?: string;
  slug?: string;
}) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No se encontró usuario');

    let { data: existingSite } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const { data: site, error: siteError } = await supabase
      .from('sites')
      .upsert({
        id: existingSite?.id,
        user_id: user.id,
        name: siteData.name || existingSite?.name || 'Mi Sitio',
        slug: existingSite?.slug || 'mi-sitio',
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (siteError) throw siteError;

    for (const section of siteData.sections) {
      const { data: dbSection, error: sectionError } = await supabase
        .from('sections')
        .upsert({
          id: section.id,
          site_id: site.id,
          name: section.name,
          slug: section.slug,
          is_home: section.is_home,
          order_index: siteData.sections.indexOf(section),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (sectionError) throw sectionError;

      const { data: existingElements } = await supabase
        .from('elements')
        .select('id')
        .eq('section_id', dbSection.id);

      if (section.elements?.length > 0) {
        const elementsToUpsert = section.elements.map((element: any) => {
          const elementData: any = {
            section_id: dbSection.id,
            type: element.type,
            config: element.config,
            updated_at: new Date().toISOString()
          };

          // Only include ID if not temporary
          if (element.id && !element.id.startsWith('temp_id')) {
            elementData.id = element.id;
          }

          return elementData;
        });

        const { error: elementsError } = await supabase
          .from('elements')
          .upsert(elementsToUpsert)
          .select();

        if (elementsError) throw elementsError;
      }

      const currentElementIds = section.elements
        ?.filter((el: { id: string }) => el.id && !el.id.startsWith('temp_id'))
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

      if (section.layout) {
        const { data: existingLayout } = await supabase
          .from('layouts')
          .select('id')
          .eq('section_id', dbSection.id)
          .eq('device', 'desktop')
          .single();

        // Save layout with all required properties
        const validatedLayout = section.layout.map(item => ({
          i: item.i,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          minH: item.minH || 2,
          minW: item.minW || 2,
          static: item.static || false,
          isDraggable: item.isDraggable !== false,
        }));

        const { error: layoutError } = await supabase
          .from('layouts')
          .upsert({
            id: existingLayout?.id,
            section_id: dbSection.id,
            layout_data: validatedLayout,
            device: 'desktop',
            updated_at: new Date().toISOString()
          });

        if (layoutError) throw layoutError;
      }
    }
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error al guardar:', error);
    return { success: false, error };
  }
}
