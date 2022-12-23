import {useEffect, useState} from "react";

const useStorageChecker = () => {
    const [quota, setQuota] = useState(0);
    const [used, setUsed] = useState(0);

    useEffect(() => {
        const getStorageSize = async () => {
            try {
                const estimate = await navigator.storage.estimate();
                setQuota(estimate.quota / (1024 * 1024));
                setUsed(parseFloat((estimate.usage / estimate.quota * 100).toFixed(2)))
            }catch (e) {
                console.log(e)
            }
        }
        getStorageSize();
    }, [])
    return {quota, used}
};

export default useStorageChecker;
