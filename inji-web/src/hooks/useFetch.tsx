import {useState} from "react";
import {api, MethodType} from "../utils/api";

export enum RequestStatus {
    LOADING,
    DONE,
    ERROR
}

export const useFetch = () => {
    const [state, setState] = useState<RequestStatus>(RequestStatus.LOADING);
    const [error, setError] = useState<string>("");

    const fetchRequest = async (uri: string, method: MethodType, header: any, body?: any) => {
        try {
            setState(RequestStatus.LOADING);
            const response = await fetch(uri, {
                method: MethodType[method],
                headers: header,
                body: body,
            });
            if (!response.ok) {
                 throw new Error("API Call failed");
            }
            if (uri.indexOf("download") !== -1) {
                setState(RequestStatus.DONE);
                return await response.blob();
            }
            setState(RequestStatus.DONE);
            return await response.json();
        } catch (e) {
            setState(RequestStatus.ERROR);
            setError("Error Happened");
        }
    };
    return {state, error, fetchRequest};
}



