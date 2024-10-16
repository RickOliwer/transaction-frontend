import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PropsType = {
  setPage: (page: number) => void;
  page: number;
  hasMore: boolean;
  isPlaceholderData: boolean;
};

const PaginationController = (props: PropsType) => {
  const { setPage, page, hasMore, isPlaceholderData } = props;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(Math.max(page - 1, 0))}
            className={
              page === 0
                ? "cursor-not-allowed text-muted hover:bg-transparent hover:text-muted"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
        {page >= 1 && (
          <PaginationItem>
            <PaginationLink>
              {page === 1 ? 1 : page === 2 ? 2 : page}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink>{page != undefined ? page + 1 : ""}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{page != undefined ? page + 2 : ""}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (!isPlaceholderData && hasMore) {
                setPage(page + 1);
              }
            }}
            className={
              isPlaceholderData || !hasMore
                ? "cursor-not-allowed text-muted hover:bg-transparent hover:text-muted"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationController;
