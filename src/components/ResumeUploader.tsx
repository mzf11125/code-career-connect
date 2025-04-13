
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, File, AlertCircle, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploaderProps {
  onUploadComplete: (file: File) => void;
  onCancel: () => void;
}

export const ResumeUploader = ({ onUploadComplete, onCancel }: ResumeUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type (PDF or DOCX)
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive",
        icon: <AlertCircle className="h-4 w-4" />
      });
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
        icon: <AlertCircle className="h-4 w-4" />
      });
      return;
    }

    setFile(file);
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
      icon: <Check className="h-4 w-4" />
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    if (file) {
      onUploadComplete(file);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed p-8 rounded-xl text-center mb-6 transition-colors ${
          dragging 
            ? "border-csgreen bg-csgreen/10" 
            : "border-gray-700 hover:border-gray-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!file ? triggerFileInput : undefined}
      >
        <input 
          type="file" 
          className="hidden" 
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        
        {!file ? (
          <>
            <FileUp className="h-12 w-12 text-csgreen mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Drop your resume here</h3>
            <p className="text-gray-400 mb-4">PDF or DOCX files only (max 5MB)</p>
            <Button 
              type="button" 
              variant="outline" 
              className="border-gray-700 hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              Browse files
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <File className="h-6 w-6 text-csgreen mr-3" />
              <div className="text-left">
                <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline" 
          className="border-gray-700 hover:bg-gray-800"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="button"
          className="bg-csgreen text-black hover:bg-csgreen/90"
          disabled={!file}
          onClick={handleSave}
        >
          Use This Resume
        </Button>
      </div>
    </div>
  );
};
