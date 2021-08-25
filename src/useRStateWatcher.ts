import RState from "@real-estate/core";
import { useEffect, useState } from "react";

/**
 * Reloads component when input states changes
 * @param stateArr An array of states to watch for and reload component
 */
function useReactWatcher(stateArr: Array<RState<any>>): any {
    const [dummyState, setDummyState] = useState<number>(0);
    const usedWatcherIds = new Map<number, number>();

    const callback = () => {
        setDummyState(dummyState + 1); // Make sure React component updates
    };

    useEffect(() => {
        // Add new watchers when old ones are deleted
        stateArr.forEach((states) => {
            const id = states.watch(() => {
                callback();
            }, false);

            usedWatcherIds.set(states.getStateId(), id);
        });

        return () => {
            // Delete each watcher for each id
            stateArr.forEach((states) => {
                const activeWatcherId = usedWatcherIds.get(states.getStateId());
                if (activeWatcherId) {
                    states.deleteWatcher(activeWatcherId);
                }
            });
        };
    }, [usedWatcherIds, stateArr]);
}

export default useReactWatcher;
