
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DialogFormProps {
  title: string;
  description: string;
  triggerButton: React.ReactNode;
  onSubmit: (formData: Record<string, string>) => void;
  fields: {
    id: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
    type?: string;
  }[];
  submitLabel?: string;
}

export function DialogForm({
  title,
  description,
  triggerButton,
  onSubmit,
  fields,
  submitLabel = "Salvar",
}: DialogFormProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    // Initialize form data with default values
    const initialData: Record<string, string> = {};
    fields.forEach(field => {
      if (field.defaultValue) {
        initialData[field.id] = field.defaultValue;
      } else {
        initialData[field.id] = '';
      }
    });
    setFormData(initialData);
  }, [fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {fields.map(field => (
              <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type || "text"}
                  className="col-span-3"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">{submitLabel}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
