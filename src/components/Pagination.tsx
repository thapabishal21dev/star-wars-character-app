import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination = ({ currentPage, hasNext, hasPrevious, onNext, onPrevious }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center space-x-4 py-8">
      <Button
        onClick={onPrevious}
        disabled={!hasPrevious}
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <span className="text-sm text-muted-foreground">
        Page {currentPage}
      </span>
      
      <Button
        onClick={onNext}
        disabled={!hasNext}
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
