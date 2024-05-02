import axios, { Method } from "axios";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

import { Status } from "../../../types/Common";

type DataType<T> = T | null;
type ResType<T> = {
  data: T;
  status: Status;
};
export interface APIOptions {
  method: Method;
  isMultipart: boolean;
  isBlob: boolean;
  timeout: number;
}

/**
 * Use skipCall to prevent avoid API call
 * Use revalidateOnMount to ensure API called every time the component re-mount, SWR use URL as cache-key
 *
 * @param apiUrl
 * @param apiReq
 * @param options
 * @param swrOptions
 * @returns
 */
export default function useFetchApi<TReq, TReturn>(
  apiUrl: string,
  apiReq: TReq,
  options?: Partial<APIOptions>,
  swrOptions?: Partial<{
    skipCall: boolean;
    revalidateOnMount: boolean;
  }>
): SWRResponse<DataType<TReturn>, string> {
  async function fetcher<TReturn>(
    args: [string, TReq, Method]
  ): Promise<TReturn> {
    const [apiUrl, apiReq, method] = args;
    try {
      const response = await axios({
        url: apiUrl,
        method: method,
        data: apiReq,
      });
      if (!response.data) {
        console.log("API response is empty:", response);
        return null;
      }

      return response.data as TReturn;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  const useSwrOptions: SWRConfiguration = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
  if (swrOptions?.revalidateOnMount) {
    useSwrOptions.revalidateOnMount = swrOptions?.revalidateOnMount;
    useSwrOptions.dedupingInterval = 0;
  }

  return useSWR<
    DataType<TReturn>,
    string,
    [string, typeof apiReq, Method] | null
  >(
    swrOptions?.skipCall ? null : [apiUrl, apiReq, options?.method || "post"],
    fetcher,
    useSwrOptions
  );
}
