import React, { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TicketReplyFormProps {
  onSubmit?: (data: { message: string; attachments: File[] }) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const TicketReplyForm = ({
  onSubmit = () => {},
  isLoading = false,
  placeholder = "Type your reply here...",
}: TicketReplyFormProps) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit({ message, attachments });
      setMessage("");
      setAttachments([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full bg-background border rounded-lg p-4 shadow-sm">
      <form onSubmit={handleSubmit}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="min-h-[80px] mb-2 resize-none"
        />

        {attachments.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-medium mb-1">Attachments:</p>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-muted px-3 py-1 rounded-md text-sm"
                >
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button
                    type="button"
                    className="ml-2 text-muted-foreground hover:text-destructive"
                    onClick={() => removeAttachment(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <input
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAttachmentClick}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Attach Files
            </Button>
          </div>

          <Button type="submit" disabled={isLoading || !message.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Send Reply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TicketReplyForm;
