"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  type: TransactionType;
  onChange: (value: string) => void;
}

const CategoryPicker = ({ type, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isValue, setIsValue] = useState("");

  useEffect(() => {
    if (!isValue) return;
    // Ketika nilai berubah, panggil kebali onChange
    onChange(isValue);
  }, [onChange, isValue]);

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === isValue
  );

  const onSuccessCallBack = useCallback(
    (category: Category) => {
      setIsValue(category.name);
      setIsOpen((prev) => !prev);
    },
    [setIsValue, setIsOpen]
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Selected Category"
          )}
          <ChevronsUpDown className="w-4 h-4 ml-1 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category..." />
          <CreateCategoryDialog
            trigger={<CommandItem disabled>Create Category</CommandItem>}
            type={type}
            successCallBack={onSuccessCallBack}
          />
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: Create a new category
            </p>
          </CommandEmpty>

          <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setIsValue(category.name);
                      setIsOpen((prev) => !prev);
                    }}
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        "ml-1 w-4 h-4 opacity-0",
                        isValue === category.name && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryPicker;

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
}
