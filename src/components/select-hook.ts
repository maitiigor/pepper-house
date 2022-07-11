import { useEffect, useRef, useState } from "react";

export const useDropDownHandler = () => {
  const [openDropDown, setopenDropDown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", function (event) {
      let target = event.target as Node;
      var isClickInsideElement = dropDownRef?.current?.contains(target);
      if (!isClickInsideElement) {
        setopenDropDown(false);
      }
    });

    return () => {
      document.removeEventListener("click", function (event) {
        let target = event.target as Node;
        var isClickInsideElement = dropDownRef?.current?.contains(target);
        if (!isClickInsideElement) {
          setopenDropDown(false);
        }
      });
    };
  }, []);

  return [dropDownRef, openDropDown, setopenDropDown] as const;
};
