'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { useCanvasStore } from '@/store/canvasStore';
import { saveSite } from '@/app/actions/saveAction';
import { loadSite } from '@/app/actions/loadSiteAction';
import { toast } from 'sonner';

export const SaveButton = () => {
  const [isSaving, setIsSaving] = useState(false);
  const currentSections = useCanvasStore((state) => state.sections);
  const setSections = useCanvasStore((state) => state.setSections)

  const handleSave = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        setIsSaving(true);
        
        const result = await saveSite({
          sections: currentSections.map(section => ({
            ...section,
            elements: section.elements.map(element => ({
              ...element,
              id: element.id && !element.id.startsWith('temp_id') ? element.id : undefined
            }))
          }))
        });

      if (result.success) {
          const loadResult = await loadSite();
          if (loadResult.success && loadResult.sections) {
            setSections(loadResult.sections);
          }
          resolve('Cambios guardados correctamente');
        } else {
          reject(result.error);
        }
      } catch {
        reject(new Error('Error al guardar los cambios'));
      } finally {
        setIsSaving(false);
      }
    });

    toast.promise(promise, {
      loading: 'Guardando cambios...',
      success: (message) => message as string,
      error: (error) => error.message
    });
  };

  return (
    <button
      className={`flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg transition-all duration-300
        ${isSaving 
          ? 'bg-emerald-500/20 text-emerald-400 cursor-wait'
          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300'
        } border border-emerald-500/30 hover:border-emerald-500/50`}
      onClick={handleSave}
      disabled={isSaving}
    >
      <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
      <span className="text-sm font-medium">
        {isSaving ? 'Guardando...' : 'Guardar'}
      </span>
    </button>
  );
};
