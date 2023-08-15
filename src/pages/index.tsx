import { BiAccessibility } from 'react-icons/bi';
import { CiBrightnessUp } from 'react-icons/ci';
import { BiSearchAlt2 } from 'react-icons/bi';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { FaQuestionCircle } from 'react-icons/fa';
import { VscGraph } from 'react-icons/vsc';
import { LiaMapMarkedAltSolid } from 'react-icons/lia';
import { BiConversation } from 'react-icons/bi';
import { AiFillFolderOpen } from 'react-icons/ai';
import { AiOutlineSetting } from 'react-icons/ai';
import { TbReportSearch } from 'react-icons/tb';
import { BiStopwatch } from 'react-icons/bi';
import { MdHistory } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { BiGlobe } from 'react-icons/bi';

import Markdown from 'react-markdown';
import gfm from 'remark-gfm';

import { Popover } from '@headlessui/react';
import { Dialog } from '@headlessui/react';

import { useEffect, useRef, useState } from 'react';

const people = [
  { id: '1', icon: VscGraph, name: 'Statistic Analysis', unavailable: false },
  {
    id: '2',
    icon: LiaMapMarkedAltSolid,
    name: 'Map Introduction',
    unavailable: false,
  },
  { id: '3', icon: BiConversation, name: 'Discussion', unavailable: false },
  {
    id: '4',
    icon: CiBrightnessUp,
    name: 'Benedict Kessler',
    unavailable: true,
  },
  { id: '5', icon: BiSearchAlt2, name: 'Katelyn Rohan', unavailable: false },
];

const ag = [
  { id: 'a', icon: HiOutlineAcademicCap, name: 'Academic', unavailable: false },
  { id: 'g', icon: BiGlobe, name: 'General Training', unavailable: false },
];

const tasks = [
  { id: '1', icon: VscGraph, name: 'Task 1', unavailable: false },
  { id: '2', icon: BiConversation, name: 'Task 2', unavailable: false },
];

export default function Page() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [example, setExample] = useState('');
  const [generatingExample, setGeneratingExample] = useState(false);
  const [category, setCategory] = useState('a');
  const [task, setTask] = useState('1');
  const [generatingQuestion, setGeneratingQuestion] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [score, setScore] = useState('');
  const [comments, setComments] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [ellapsedTime, setEllapsedTime] = useState('00:00');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (startTime) {
      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsedMilliseconds = currentTime - startTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        setEllapsedTime(formattedTime);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime]);

  const onButtonSettings = () => {
    console.log('ButtonSettings clicked.');
  };

  const onButton1 = () => {
    console.log('Button1 clicked.');
  };
  const onButton2 = () => {
    console.log('Button2 clicked.');
  };
  const onButton3 = () => {
    console.log('Button3 clicked.');
  };

  const onButtonTime = () => {
    console.log('Time Set.');
  };

  const onSubmit = async () => {
    console.log('Submit clicked');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setStartTime(null);
    }
    if (!answer) return;
    const prompt = `Please act as an IELTS testing expert and help me to evaluate what score can I get, 
    provide the estimated score and explanation in JSON format as { score: 8.0, comments: "comments here about my writing" } . 
    Only give out JSON data, no extra explanations.
    
    ${answer}
    `;
    try {
      setScoring(true);
      const response = await fetch('https://chatapi.lyu.ai/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: prompt,
        }),
      });
      const res = await response.json();
      console.log('text', res.text);
      const result = JSON.parse(res.text);
      setScore(result.score);
      setComments(result.comments);
    } catch (error) {
      console.error('Error fetching HTML:', error);
    } finally {
      setScoring(false);
    }
  };



















  const onAnswerChange = (e: any) => {
    setAnswer(e.target.value);
  };

  const onSelectCategory = (id: string) => {
    console.log('onSelectCategory', id);
    setCategory(id);
  };

  const onSelectTask = (id: string) => {
    console.log('onSelectTask', id);
    setTask(id);
  };

  const onLoadSettings = async (id: string) => {
    console.log('onLoadSettings', id);
    try {
      const response = await fetch(`/questions/${id}.html`);
      const html = await response.text();
      setQuestion(html);
      console.log('html', html);
    } catch (error) {
      console.error('Error fetching HTML:', error);
    }
  };

  const onExample = async () => {
    console.log('Example clicked');
    try {
      setGeneratingExample(true);
      const response = await fetch('https://chatapi.lyu.ai/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          text: `Please act as an IELTS examiner, based on this question: ${question} (you can ignore the images), provide an example of answer with score 8 criteria.
            If no question provided, please give your own question and then generate example answer for this question.
            `,
        }),
      });
      const res = await response.json();
      console.log('text', res.text);
      setExample(res.text);
    } catch (error) {
      console.error('Error fetching HTML:', error);
    } finally {
      setGeneratingExample(false);
    }
  };

  const onGenerateQuestion = async () => {
    console.log('onGenerateQuestion');
    const testName = ag.find(item => item.id === category)?.name || 'Academic';
    const prompt = `
    Please act as a professional IELTS examiner and design an original IELTS ${testName} writing task ${task}.
    
    Please give out the question in the same format of IELTS testing, no extra explanations such as "Sure, here is ...". 

    If your question contains table, convert the table to GFM format (GitHub Favored Markdown).
    
    Do not include testing topics involve charts or pictures as you are not able to provide multimedia information. 

    Please end with "you should write ... words. Do not tell me any "Introduction", "Findings" or "Conclusions" 

    The last writing task you gave is: (wrapped with ~~~~~~~~)
    
    ~~~~~~~~
    ${question}
    ~~~~~~~~
    Please provide a bran-new one which is completely differrent from this one.`;
    console.log('prompt', prompt);
    setGeneratingQuestion(true);
    try {
      const response = await fetch('https://chatapi.lyu.ai/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: prompt,
        }),
      });
      const res = await response.json();
      console.log('question', res.text);
      setQuestion(res.text);
      setStartTime(Date.now());
    } catch (error) {
      console.error('Error fetching HTML:', error);
    }
    setGeneratingQuestion(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full items-center h-screen min-h-screen bg-base-200 gap-3 p-2">
      {/* <div className="sidebar flex w-10 h-full">
        <div className="text-base-content bg-gray-800 flex flex-col h-full rounded-md p-1 gap-2">

          <Popover className="Settings">
            <Popover.Button className="w-9 h-9 outline-none hover:bg-slate-700 rounded-md onClick=bg-neutral p-1">
              <AiOutlineSetting className='w-6 h-6' />
            </Popover.Button>
            <Popover.Panel className="absolute z-60">
              <div className="flex flex-col bg-base-100 gap-2 rounded-md shadow">
                {settings.map(({ id, icon: Icon, name }) => (
                  <div key={id} className="hover:bg-neutral-focus p-2 gap-2 flex items-center" onClick={() => onLoadSettings(id)}>
                    <Icon className="w-5 h-5" />
                    {name}
                  </div>
                ))}
              </div>
              <div className='text-base-content w-full h-full'></div>

              <img src="/solutions.jpg" alt="" />
            </Popover.Panel>
          </Popover>

          <button onClick={onButtonTime} className="btn btn-sm btn-circle items-center btn-ghost">
            <MdHistory className="w-6 h-6" />
          </button>

          <button onClick={onButton1} className="btn btn-sm btn-circle btn-ghost">
            <BiSearchAlt2 className="w-6 h-6" />
          </button>


          <button onClick={onButton2} className="btn btn-sm btn-circle items-center btn-ghost">
            <GiPerspectiveDiceSixFacesRandom className="w-7 h-7" />
          </button>

          <button onClick={onButton3} className="btn btn-sm btn-circle items-center btn-ghost">
            <BiStopwatch className="w-6 h-6" />
          </button>
        </div>

      </div> */}

      <div className="left-pane flex flex-col w-full lg:w-1/2 h-full gap-2">
        <div className="relative question flex flex-col w-full h-1/2">
          <div className="toolbar text-slate-200 flex-0 bg-base-100 text-gray-300 w-full flex items-center justify-between h-14 rounded-t px-2">
            <div className="flex items-center p-1 gap-2">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="logo" className="w-8 h-8" />
                <div className="font-bold text-blue-900">ILETS Catalyst</div>
              </div>
              <Popover className="relative">
                <Popover.Button className="h-9 px-2 bg-slate-800 outline-none hover:bg-blue-700 rounded-md onClick=bg-neutral">
                  {ag.find(item => item.id === category)?.name || 'Not found'}
                </Popover.Button>

                <Popover.Panel className="absolute z-50">
                  <div className="flex flex-col bg-slate-900 gap-2 rounded-md shadow">
                    {ag.map(({ id, icon: Icon, name }) => (
                      <Popover.Button
                        as="div"
                        key={id}
                        className="hover:bg-blue-700 rounded-md p-1 gap-2 flex items-center cursor-pointer"
                        onClick={() => onSelectCategory(id)}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="whitespace-nowrap">{name}</div>
                      </Popover.Button>
                    ))}
                  </div>
                  <div className="text-gray-300 w-full h-full"></div>
                </Popover.Panel>
              </Popover>

              <Popover className="relative">
                <Popover.Button className="h-9 px-2 bg-slate-800 outline-none hover:bg-blue-700 rounded-md">
                  {tasks.find(item => item.id === task)?.name || 'Not found'}
                </Popover.Button>
                <Popover.Panel className="absolute z-50">
                  <div className="flex flex-col bg-slate-900 gap-2 rounded-md shadow">
                    {tasks.map(({ id, icon: Icon, name }) => (
                      <Popover.Button
                        as="div"
                        key={id}
                        className="hover:bg-blue-800 rounded-md p-1 gap-2 flex items-center cursor-pointer"
                        onClick={() => onSelectTask(id)}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="whitespace-nowrap">{name}</div>
                      </Popover.Button>
                    ))}
                  </div>
                  <div className="text-base-content w-full h-full"></div>
                </Popover.Panel>
              </Popover>
            </div>


            <div className="flex items-center gap-2">
              <button
                onClick={onGenerateQuestion}
                className="btn btn-sm items-center bg-blue-900 text-gray-300 normal-case hover:bg-blue-700"
              >
                {question ? 'Regenerate' : 'Generate'}
              </button>
              <BiStopwatch className="w-6 h-6" />
              <div className="w-12 text-right">{ellapsedTime}</div>
            </div>
          </div>

          <div className={`bg-gray-800 w-full flex-1 rounded-b-md text-gray-300 overflow-y-auto p-2`}>
            {question ?
              <Markdown remarkPlugins={[gfm]} className="markdown-container">
                {question}
              </Markdown> : <div className="text-gray-400">
                <p>Step1: Click "Acadmic" to choose: Acadmic / General Training</p>
                <p>Step2: Click "Task 1" to choose: Task 1 / Task 2</p>
                <p>Step3: Click "Generate" to generate a question</p>
              </div>
            }
          </div>
          {generatingQuestion && (
            <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-slate-800 rounded-md">
              <div className="loading loading-spinner text-blue-800" />
              <div className="text-gray-300">Generating... Finishing in about 15 seconds.</div>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full h-1/2 bg-gray-800 gap-2 rounded-md">
          <textarea
            value={answer}
            onChange={onAnswerChange}
            placeholder="Step4: Please start to write..."
            className="h-full bg-gray-800 rounded-md text-gray-300 p-3 resize-none"
          />
          <button
            onClick={onSubmit}
            className={`btn-sm bg-blue-900 text-gray-300 rounded-b normal-case hover:bg-blue-700 ${answer ? '' : 'btn-disabled'} `}>
            {answer.length > 100 ? 'Submit' : 'Please write'}
          </button>
        </div>
      </div>
      <div className="right-pane flex  flex-col w-full lg:w-1/2 h-full gap-2">
        <div className="relative flex flex-col bg-gray-800 w-full h-1/3 rounded-md text-secondary justify-center overflow-y-auto p-3 gap-2">
          {scoring && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-md gap-2">

              <div className="text-blue-800 loading loading-spinner" />
              <div className="text-gray-300">Scoring... Finishing in about 5 seconds.</div>
            </div>
          )}
          {comments ? '' :
            <div className="text-gray-400">
              <p>Step5: Your score and results will be shown here.</p>
              <p>Step6: Click "Generate Example" to get an example if you want.</p>
            </div>
          }
          <div className="text-5xl w-full text-center font-bold text-gray-300">{score}</div>
          <div className="w-full text-gray-300">{comments}</div>
        </div>
        <div className="flex bg-slate-800 w-full h-2/3 rounded-md text-gray-300 p-3 gap-2 overflow-y-auto">
          <div className={`flex flex-col w-full gap-2 ${example ? '' : 'h-full items-center justify-center'}`}>
            <Markdown remarkPlugins={[gfm]} children={example} className="markdown-container" />
            <button id="sample" onClick={onExample} className="btn text-gray-300 bg-blue-900 normal-case hover:bg-blue-700">
              {generatingExample && (
                <div className="loading loading-spinner loading-sm" />
              )}
              Generate Example
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
