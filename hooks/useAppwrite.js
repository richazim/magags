import {useEffect, useState} from "react";

export const useAppwrite = (func) => {
    const [data, setData] = useState(null);
    const [appwriteIsLoading, setAppwriteIsLoading] = useState(false);

    const execute = (func) => {
        setAppwriteIsLoading(true);
        func()
            .then((videos) => {
                setData(videos)
            })
            .catch((err) => {
                throw err;
            })
            .finally(() => {
                setAppwriteIsLoading(false);
            })
    }

    useEffect(() => {
        execute(func);
    }, []);

    const reExecute = () => {
        execute(func);
    }

    return {
        reExecute,
        data,
        appwriteIsLoading
    }
}