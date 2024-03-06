import { useState } from "react";
import useHTTP from "./useHTTP";

export default function useOptions() {
    const [sendHTTP, httpRes] = useHTTP();

    async function handleGetHTTPOptions(path, labelKey) {
        const res = await sendHTTP(path, "GET");
        console.log(res);
        if (res?.error) {
            console.log("🍅🍅🍅 Error 🍅🍅🍅", res?.error);
            return [];
        }
        return res?.data?.data?.map((item) => ({ value: item.id, label: item?.[labelKey] }));
    }

    const [options] = useState({
        gender: [
            { value: "m", label: "Male" },
            { value: "f", label: "Female" },
        ],
        courseType: [
            { value: "practical", label: "Practical" },
            { value: "theoretical", label: "Theoretical" }
        ],
        stage: [
            { value: "1", label: "First Year" },
            { value: "2", label: "Second Year" },
            { value: "3", label: "Third Year" },
            { value: "4", label: "Fourth Year" },
            { value: "5", label: "Fifth Year" },
        ],
    });

    function getOptions(name, labelKey = "name") {
        if (name.startsWith("/")) {
            return handleGetHTTPOptions(name, labelKey);
        }
        return options[name];
    }


    return getOptions;
}