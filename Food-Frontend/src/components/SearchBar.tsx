import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

const formShema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type searchForm = z.infer<typeof formShema>;

type Props = {
  onSubmit: (FormData: searchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
  suggestions?: string[];
  searchType: "city" | "cuisine";
  onSearchSuggestions?: (query: string) => void;
};

function SearchBar({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery,
  suggestions,
  searchType,
  onSearchSuggestions,
}: Props) {
  const form = useForm<searchForm>({
    resolver: zodResolver(formShema),
    defaultValues: {
      searchQuery,
    },
  });

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState(searchQuery || "");

  const handleInputChange = (value: string) => {
    setQuery(value);

    if (searchType === "city") {
      setFilteredSuggestions(
        suggestions?.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        ) || []
      );
    }

    if (searchType === "cuisine" && onSearchSuggestions) {
      onSearchSuggestions(value);
    }
  };

  useEffect(() => {
    form.reset({ searchQuery });
    setQuery(searchQuery || "");
  }, [form, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
    setFilteredSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("searchQuery", suggestion);
    setFilteredSuggestions([]);
    setIsDropdownOpen(false);
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex relative items-center gap-3 justify-between flex-row border-2 rounded-full p-3 mx-4 md:mx-0 lg:mx-5 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 md:block hidden"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-base md:text-lg lg:text-xl caret-orange-500 focus-visible:ring-0"
                  placeholder={placeHolder}
                  autoComplete="off"
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e.target.value);
                  }}
                  onFocus={() => {
                    setIsDropdownOpen(true);
                    handleInputChange(query);
                  }}
                />
              </FormControl>
              {isDropdownOpen && filteredSuggestions.length > 0 && (
                <ul
                  ref={dropdownRef}
                  className="absolute bg-white border border-gray-200 left-0 top-full right-0 rounded-3xl w-full max-h-60 overflow-auto z-10 transition-all duration-300 ease-in-out"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </FormItem>
          )}
        />

        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Reset
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
}

export default SearchBar;
