import React, { useState, useRef, ChangeEvent } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Inicialize a API do Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyDE5BaySsuQk4d7KjyII3XbwvGR1dym2XE");
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const ExamPreparation: React.FC = () => {
  const [examImage, setExamImage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const imageData = await fileToGenerativePart(file);
        const prompt = "Analise esta imagem de exame e crie um quiz com 5 questões de múltipla escolha baseadas no conteúdo. Formate a resposta como um array JSON com cada objeto de questão contendo os campos 'question', 'options' (array de 4 opções), 'correctAnswer' (índice da opção correta) e 'explanation'. Responda em português brasileiro.";

        const result = await model.generateContent([prompt, imageData]);
        const responseText = result.response.text();
        const quizData: Question[] = parseQuizData(responseText);
        setQuestions(quizData);
        setCurrentQuestion(0);
        setSelectedAnswers(new Array(quizData.length).fill(''));
        setExplanation('');
        setExamImage(URL.createObjectURL(file));
        setQuizCompleted(false);
      } catch (error) {
        console.error('Erro ao processar a imagem do exame:', error);
        alert('Erro ao processar a imagem do exame. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const parseQuizData = (text: string): Question[] => {
    const cleanedText = text.replace(/```json\n|\n```/g, '');
    try {
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error('Erro ao analisar JSON:', error);
      const questions = cleanedText.split(/\d+\.\s/).filter(q => q.trim() !== '');
      return questions.map((q, index) => ({
        question: q.split('\n')[0],
        options: q.split('\n').slice(1, 5).map(o => o.replace(/^[a-d]\)\s/, '')),
        correctAnswer: 0,
        explanation: `Explicação para a questão ${index + 1}`
      }));
    }
  };

  const fileToGenerativePart = (file: File): Promise<{ inlineData: { data: string, mimeType: string } }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve({
          inlineData: {
            data: result.split(',')[1],
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnswerSelect = (value: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = value;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleHelp = async () => {
    if (!questions[currentQuestion]) return;

    setIsLoading(true);
    try {
      const prompt = `Explique detalhadamente a seguinte questão em português brasileiro: ${questions[currentQuestion].question}`;
      const result = await model.generateContent(prompt);
      setExplanation(result.response.text());
    } catch (error) {
      console.error('Erro ao gerar explicação:', error);
      setExplanation('Desculpe, ocorreu um erro ao gerar a explicação.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setExplanation('');
    } else if (currentQuestion === questions.length - 1 && !quizCompleted) {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setExplanation('');
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (parseInt(selectedAnswers[index]) === question.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  return (
    <Card className="w-full border-none  shadow-none bg-">
      <CardHeader>
        <h2 className="text-2xl font-bold text-zinc-500 ">Preparação para Exames</h2>
      </CardHeader>
      <CardContent>
        {!examImage ? (
          <div className="text-center">
            <Button onClick={() => fileInputRef.current?.click()}>
              Fazer Upload do Exame
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </div>
        ) : (
          <div className="space-y-5 w-[70%] text-zinc-200 "> 
            <img src={examImage} alt="Exame" className="max-w-full w-[150px] rounded-lg h-auto" />
            {!quizCompleted ? (
              questions[currentQuestion] && (
                <div>
                  <h3 className="font-bold mb-2">Questão {currentQuestion + 1}</h3>
                  <p>{questions[currentQuestion].question}</p>
                  <RadioGroup
                    value={selectedAnswers[currentQuestion]}
                    onValueChange={handleAnswerSelect}
                    className="mt-2"
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="mt-4 flex justify-between">
                    <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
                      Anterior
                    </Button>
                    <Button onClick={handleHelp} disabled={isLoading}>
                      {isLoading ? 'Carregando...' : '💡 Ajuda'}
                    </Button>
                    <Button onClick={handleNext}>
                      {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div>
                <h3 className="font-bold mb-2">Resultado do Quiz</h3>
                <p>Você acertou {calculateScore()} de {questions.length} questões.</p>
                {questions.map((question, index) => (
                  <div key={index} className="mt-4">
                    <p><strong>Questão {index + 1}:</strong> {question.question}</p>
                    <p>Sua resposta: {question.options[parseInt(selectedAnswers[index])]}</p>
                    <p>Resposta correta: {question.options[question.correctAnswer]}</p>
                    <p>Explicação: {question.explanation}</p>
                  </div>
                ))}
                <Button onClick={() => {
                  setQuizCompleted(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers(new Array(questions.length).fill(''));
                }} className="mt-4">
                  Reiniciar Quiz
                </Button>
              </div>
            )}
            {explanation && !quizCompleted && (
              <Alert className="mt-4">
                <AlertDescription>{explanation}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamPreparation;