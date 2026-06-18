import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { getAllWords } from '../services/wordService';
import { toggleLearned, isLearned } from '../services/progressService';
import { BRAND_GRADIENT } from '../config/brand';

const QUESTION_COUNT = 5;
const OPTIONS_PER_QUESTION = 4;

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Build a fresh set of multiple-choice questions: show a word, pick its meaning.
const buildQuiz = () => {
  const pool = getAllWords();
  const questions = shuffle(pool).slice(0, QUESTION_COUNT);
  return questions.map((q) => {
    const distractors = shuffle(pool.filter((w) => w.word !== q.word))
      .slice(0, OPTIONS_PER_QUESTION - 1)
      .map((w) => w.meaning);
    return {
      word: q.word,
      partOfSpeech: q.partOfSpeech,
      trackId: q.trackId,
      trackName: q.trackName,
      answer: q.meaning,
      options: shuffle([q.meaning, ...distractors]),
    };
  });
};

function Quiz() {
  const [questions, setQuestions] = useState(() => buildQuiz());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const handleSelect = (option) => {
    if (selected !== null) return; // already answered
    setSelected(option);
    if (option === current.answer) {
      setScore((s) => s + 1);
      // Reinforce: a word you got right counts as learned.
      if (!isLearned(current.trackId, current.word)) {
        toggleLearned({
          trackId: current.trackId,
          trackName: current.trackName,
          word: current.word,
          partOfSpeech: current.partOfSpeech,
          meaning: current.answer,
        });
      }
    }
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const restart = () => {
    setQuestions(buildQuiz());
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const optionColor = (option) => {
    if (selected === null) return 'inherit';
    if (option === current.answer) return 'success';
    if (option === selected) return 'error';
    return 'inherit';
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Box sx={{ mb: 4, p: 4, background: BRAND_GRADIENT, borderRadius: '12px', color: 'white', textAlign: 'center' }}>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Quick Quiz
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Match each word to its meaning
          </Typography>
        </Box>

        {finished ? (
          <Card sx={{ textAlign: 'center', py: 6, px: 3 }}>
            <Typography variant="h2" fontWeight={700} color="primary">
              {score}/{questions.length}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
              {score === questions.length
                ? 'Perfect score! 🌳'
                : score >= questions.length / 2
                ? 'Nice work — keep growing.'
                : 'Good start — try again to improve.'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Words you got right were added to your learned list.
            </Typography>
            <Button variant="contained" startIcon={<ReplayRoundedIcon />} onClick={restart}>
              New Quiz
            </Button>
          </Card>
        ) : (
          <>
            <LinearProgress
              variant="determinate"
              value={(index / questions.length) * 100}
              sx={{ mb: 1, height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary">
              Question {index + 1} of {questions.length}
            </Typography>

            <Card sx={{ mt: 2 }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="overline" color="text.secondary">
                  What does this word mean?
                </Typography>
                <Typography variant="h3" color="primary" gutterBottom sx={{ wordBreak: 'break-word' }}>
                  {current.word}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 3 }}>
                  {current.partOfSpeech} · {current.trackName}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {current.options.map((option) => {
                    const color = optionColor(option);
                    return (
                      <Button
                        key={option}
                        onClick={() => handleSelect(option)}
                        variant={selected !== null && color !== 'inherit' ? 'contained' : 'outlined'}
                        color={color === 'inherit' ? 'primary' : color}
                        disabled={selected !== null && color === 'inherit'}
                        endIcon={
                          selected !== null && option === current.answer ? (
                            <CheckCircleRoundedIcon />
                          ) : selected === option ? (
                            <CancelRoundedIcon />
                          ) : null
                        }
                        sx={{ justifyContent: 'space-between', textTransform: 'none', textAlign: 'left', py: 1.5 }}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </Box>

                {selected !== null && (
                  <Button fullWidth variant="contained" onClick={handleNext} sx={{ mt: 3 }}>
                    {index + 1 >= questions.length ? 'See Results' : 'Next Question'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Quiz;
