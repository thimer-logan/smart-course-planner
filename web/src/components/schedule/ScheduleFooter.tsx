import { Pagination, PaginationProps } from "antd";
import React from "react";

interface ScheduleFooterProps {
  page: number;
  totalPages: number;
  onPageChanged: (newPage: number) => void;
}

const ScheduleFooter = ({
  page,
  totalPages,
  onPageChanged,
}: ScheduleFooterProps) => {
  const pageChangedHandler: PaginationProps["onChange"] = (page) => {
    onPageChanged(page);
  };

  return (
    <div className="my-2">
      <Pagination
        current={page}
        onChange={pageChangedHandler}
        defaultPageSize={1}
        total={totalPages}
      />
    </div>
  );
};

export default ScheduleFooter;
