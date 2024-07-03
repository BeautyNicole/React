const { fetchChannelsAPI } = require("@/apis/articles");
const { useState, useEffect } = require("react");

function useChannelList() {
    const [channelList, setChannellist] = useState([]);
    useEffect(() => {
        const getChannelList = async () => {
            const res = await fetchChannelsAPI();
            setChannellist(res.data.data.channels);
        }
        getChannelList();
    }, []);

    return { channelList };

}

export default useChannelList;