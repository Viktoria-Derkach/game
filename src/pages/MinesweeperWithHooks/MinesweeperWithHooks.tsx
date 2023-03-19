import React, { FC } from 'react';

import { Top } from '@/components/Top';
import { GameLayout } from '@/components/Game';

import { GameWithHooks } from '@/modules/GameWithHooks';

import { useParams, useSearchParams } from 'react-router-dom';

export const MinesweeperWithHooks: FC = () => {
  const { username } = useParams<{ username?: string }>();

  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with ReactHooks special for you
          {username && `, ${username}`}
          {id && `; userId: ${id}`}
        </Top>
      }
    >
      <GameWithHooks />
    </GameLayout>
  );
};
