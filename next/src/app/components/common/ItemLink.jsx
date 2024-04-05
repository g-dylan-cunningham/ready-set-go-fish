import React from "react";

const ItemLink = ({ href, value }) => {
  return (
    <div>
      <a href={href} class="btn btn-neutral btn-sm md:btn-md gap-2 lg:gap-3">
        {/* <div class="flex flex-col items-end"> */}
          {/* <span class="text-neutral-content/50 hidden text-xs font-normal md:block">
            Edit
          </span>{" "} */}
          <span>{value}</span>
        {/* </div>{" "} */}
        <svg
          class="h-6 w-6 fill-current md:h-8 md:w-8"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
        </svg>
      </a>
    </div>
  );
};

export default ItemLink;
