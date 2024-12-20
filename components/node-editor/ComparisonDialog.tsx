import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface ComparisonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  inputImage: string | null;
  outputImage: string | null;
}

const ComparisonDialog = ({
  isOpen,
  onClose,
  inputImage,
  outputImage,
}: ComparisonDialogProps) => {
  const handleDownload = (imageUrl: string, prefix: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${prefix} - ${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Image Processing Result</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h1 className="font-title">Input Image</h1>
            {inputImage ? (
              <div className="relative group">
                <img
                  src={inputImage}
                  className="w-full h-auto rounded-lg border"
                  alt=""
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                No Input Image
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h1 className="font-title">Ouput Image</h1>
            {outputImage ? (
              <div className="relative group">
                <img
                  src={outputImage}
                  className="w-full h-auto rounded-lg border"
                  alt=""
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDownload(outputImage, 'output')}
                >
                    <Download className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                Processing failed
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonDialog;
