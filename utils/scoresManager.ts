import axios from 'axios';
import Board from '../Board';
import { BACKEND_URL } from '../constants/Backend';
import { Difficulty, ScoreLine } from '../types';
import { computeScore } from './computeScore';
import { addLocalScores, getLocalScores } from './storage';

export const scoreManager = async (
  board: Board,
  seconds: number,
  difficulty: Difficulty,
  name: string
) => {
  const score = getScoreLineFromInfo(board, seconds, difficulty, name);

  await addLocalScores(score);

  synchronizeData(difficulty);
};

const synchronizeData = (difficulty: Difficulty) => {
  getBestScoreFromLocal(difficulty).then((bestScore) => {
    postScore(bestScore);
  });
};

const getBestScoreFromLocal = async (
  difficulty: Difficulty
): Promise<ScoreLine> => {
  const scores = await getLocalScores();

  return scores.filter((a) => a.level === difficulty)[0];
};

const postScore = (scoreLine: ScoreLine) => {
  console.log('Posting score online');
  console.log(scoreLine);

  axios
    .post(BACKEND_URL + '/leaderboard', scoreLine)
    .then((response) => console.log(response.data))
    .catch((err) => console.error(err));
};

const getScoreLineFromInfo = (
  board: Board,
  seconds: number,
  difficulty: Difficulty,
  name: string
): ScoreLine => {
  return {
    name: name,
    score: computeScore(board, seconds),
    time: seconds,
    level: difficulty,
    date: new Date() //placeholder: real date is generated in the back when received
  };
};
