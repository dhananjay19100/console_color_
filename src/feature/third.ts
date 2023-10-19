const addHighlightTags = (
  innerHTML: string | HTMLElement,
  startIndex: number,
  endIndex: number
) => {
  let inner;
  if (typeof innerHTML === "string") {
    inner = replaceHtmlEntities(innerHTML);
  } else {
    inner = replaceHtmlEntities(innerHTML.innerHTML);
  }
  const actualIndex = findActualIndex(inner, startIndex);
  endIndex = endIndex + (actualIndex - startIndex) - 1;
  startIndex = actualIndex;
  let stared = false;
  let tagStarted = false;
  let needToAdd = false;

  for (let i = startIndex; i <= endIndex; i++) {
    const char = inner.charAt(i);
    const strong =
      inner.charAt(i) +
      inner.charAt(i + 1) +
      inner.charAt(i + 2) +
      inner.charAt(i + 3) +
      inner.charAt(i + 4) +
      inner.charAt(i + 5) +
      inner.charAt(i + 6) +
      inner.charAt(i + 7);
    const tag =
      inner.charAt(i) +
      inner.charAt(i + 1) +
      inner.charAt(i + 2) +
      inner.charAt(i + 3);
    const uTag = inner.charAt(i) + inner.charAt(i + 1) + inner.charAt(i + 2);
    const EStrong =
      inner.charAt(i - 7) +
      inner.charAt(i - 6) +
      inner.charAt(i - 5) +
      inner.charAt(i - 4) +
      inner.charAt(i - 3) +
      inner.charAt(i - 2) +
      inner.charAt(i - 1) +
      inner.charAt(i);
    const Etag =
      inner.charAt(i - 3) +
      inner.charAt(i - 2) +
      inner.charAt(i - 1) +
      inner.charAt(i);
    const EuTag = inner.charAt(i - 2) + inner.charAt(i - 1) + inner.charAt(i);
    if (
      char === "<" &&
      (strong === "<strong>" ||
        strong === "</strong" ||
        tag === "<em>" ||
        tag === "</em" ||
        tag === "<ol>" ||
        tag === "</ol" ||
        tag === "<li>" ||
        tag === "</li" ||
        tag === "<ul>" ||
        tag === "</ul" ||
        tag === "<mar" ||
        tag === "</ma" ||
        uTag === "<u>" ||
        uTag === "</u")
    ) {
      tagStarted = true;
      endIndex = endIndex + 1;
      if (stared) {
        stared = false;
        const modifiedHTML: string =
          inner.slice(0, i) + "</mark>" + inner.slice(i);
        inner = modifiedHTML;
        endIndex = endIndex + 7;
        i = i + 7;
        needToAdd = true;
      }
    } else if (
      (i === startIndex && !tagStarted) ||
      (needToAdd && !tagStarted)
    ) {
      stared = true;
      needToAdd = false;
      const modifiedHTML: string =
        inner.slice(0, i) + "<mark>" + inner.slice(i);
      inner = modifiedHTML;
      endIndex = endIndex + 6;
      i = i + 5;
    } else if (
      tagStarted &&
      char === ">" &&
      (EStrong === "<strong>" ||
        EStrong === "/strong>" ||
        Etag === "<em>" ||
        Etag === "/em>" ||
        Etag === "<ol>" ||
        Etag === "/ol>" ||
        Etag === "<li>" ||
        Etag === "/li>" ||
        Etag === "<ul>" ||
        Etag === "/ul>" ||
        EuTag === "<u>" ||
        EuTag === "/u>")
    ) {
      endIndex = endIndex + 1;
      tagStarted = false;
    } else if (tagStarted) {
      endIndex = endIndex + 1;
    } else if (i === endIndex) {
      const modifiedHTML: string =
        inner.slice(0, i + 1) + "</mark>" + inner.slice(i + 1);
      inner = modifiedHTML;
    }
  }
  if (typeof innerHTML !== "string") {
    innerHTML.innerHTML = inner;
  }
  return inner;
};
function findActualIndex(innerHTML: string, targetIndex: number): number {
  let currentIndex = 0;
  let actualIndex = 0;
  while (currentIndex < innerHTML.length) {
    const strong =
      innerHTML[currentIndex] +
      innerHTML[currentIndex + 1] +
      innerHTML[currentIndex + 2] +
      innerHTML[currentIndex + 3] +
      innerHTML[currentIndex + 4] +
      innerHTML[currentIndex + 5] +
      innerHTML[currentIndex + 6] +
      innerHTML[currentIndex + 7];
    const tag =
      innerHTML[currentIndex] +
      innerHTML[currentIndex + 1] +
      innerHTML[currentIndex + 2] +
      innerHTML[currentIndex + 3];
    const uTag =
      innerHTML[currentIndex] +
      innerHTML[currentIndex + 1] +
      innerHTML[currentIndex + 2];
    if (
      innerHTML[currentIndex] === "<" &&
      (strong === "<strong>" ||
        strong === "</strong" ||
        tag === "<em>" ||
        tag === "</em" ||
        tag === "<ol>" ||
        tag === "</ol" ||
        tag === "<li>" ||
        tag === "</li" ||
        tag === "<ul>" ||
        tag === "</ul" ||
        tag === "<mar" ||
        tag === "</ma" ||
        uTag === "<u>" ||
        uTag === "</u")
    ) {
      while (
        currentIndex < innerHTML.length &&
        innerHTML[currentIndex] !== ">"
      ) {
        currentIndex++;
      }
      if (currentIndex < innerHTML.length) {
        currentIndex++;
      }
    } else {
      if (actualIndex === targetIndex) {
        return currentIndex;
      }
      currentIndex++;
      actualIndex++;
    }
  }
  return -1;
}
function replaceHtmlEntities(element: string) {
  const entityMap: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&reg;": "®",
    "&copy;": "©",
    "&euro;": "€",
    "&yen;": "¥",
    "&pound;": "£",
    "&nbsp;": " ",
  };
  for (const entity in entityMap) {
    if (Object.prototype.hasOwnProperty.call(entityMap, entity)) {
      const regex = new RegExp(entity, "g");
      element = element.replace(regex, entityMap[entity]);
    }
  }
  return element;
}
export {addHighlightTags};