import { memo, useCallback, useMemo, useState } from "react";

const GameIconType = Object.freeze({
  Outplayed: "outplayed",
  Overwolf: "overwolf"
});

const IconSource = Object.freeze({
  Overwolf: "https://static.overwolf.com/GameIcons/[gameId].png",
  Outplayed: "https://cdn.outplayed.tv/games/[gameId]/game-icon.webp"
});

const GameIcon = ({ game }) => {
  const { id, iconType } = game;

  const [urlTemplate, setUrlTemplate] = useState(
    iconType === GameIconType.Outplayed
      ? IconSource.Outplayed
      : IconSource.Overwolf
  );
  const asset = useMemo(
    () => urlTemplate && urlTemplate.replace("[gameId]", id.toString()),
    [urlTemplate, id]
  );
  const onError = useCallback(() => {
    if (urlTemplate && urlTemplate !== IconSource.Overwolf) {
      // If we used a custom icon and failed to load it, we attempt to load the overwolf icon
      setUrlTemplate(IconSource.Overwolf);
      return;
    }
    setUrlTemplate(null);
  }, [urlTemplate, setUrlTemplate]);

  return (
    <div className="game-icon">
      {asset ? (
        <img src={asset} alt={`game-${id}`} onError={onError} />
      ) : (
        <div className="fallback-image" />
      )}
    </div>
  );
};

export default memo(GameIcon);
