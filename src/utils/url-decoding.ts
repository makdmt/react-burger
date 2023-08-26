export function searchParamsToObject(search: string): object {
  return search.substring(1).split("&").reduce(function(result: any, value: string) {
    const parts: Array<string> = value.split('=');
    if (parts[0]) result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    return result;
  }, {})
}
