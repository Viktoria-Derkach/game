import React, { FC, useCallback } from 'react';

import { GameLevels, LevelNames } from '@/modules/GameSettings';
import { Scoreboard } from '@/components/Scoreboard';
import { Grid } from '@/components/Grid';
import { GameOver } from '@/components/Game';
import { useGame } from './useGame';

export const GameWithHooks: FC = () => {
  const {
    level,
    isGameOver,
    isWin,
    settings,
    playerField,
    flagCounter,
    onClick,
    onContextMenu,
    onChangeLevel,
    onReset,
    time,
  } = useGame();

  const [, bombs] = settings;

  const onChangeLevelHandler = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      onChangeLevel(level as LevelNames),
    []
  );

  return (
    <>
      <Scoreboard
        time={String(time)}
        bombs={String(bombs - flagCounter)}
        levels={GameLevels as unknown as string[]}
        defaultLevel={level}
        onChangeLevel={onChangeLevelHandler}
        onReset={onReset}
      />
      {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
      <Grid onClick={onClick} onContextMenu={onContextMenu}>
        {playerField}
      </Grid>
    </>
  );
};
