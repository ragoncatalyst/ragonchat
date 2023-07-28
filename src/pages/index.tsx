import { BiAccessibility } from 'react-icons/bi';
import { CiBrightnessUp } from 'react-icons/ci';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Popover } from '@headlessui/react';
import { useState } from 'react';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { FaQuestionCircle } from 'react-icons/fa';
import { VscGraph } from 'react-icons/vsc';
import { LiaMapMarkedAltSolid } from 'react-icons/lia';
import { BiConversation } from 'react-icons/bi';
import { AiFillFolderOpen } from 'react-icons/ai';
import { AiOutlineSetting } from 'react-icons/ai';






const people = [
  { id: "1", icon: VscGraph, name: 'Statistic Analysis', unavailable: false },
  { id: "2", icon: LiaMapMarkedAltSolid, name: 'Map Introduction', unavailable: false },
  { id: "3", icon: BiConversation, name: 'Discussion', unavailable: false },
  { id: "4", icon: CiBrightnessUp, name: 'Benedict Kessler', unavailable: true },
  { id: "5", icon: BiSearchAlt2, name: 'Katelyn Rohan', unavailable: false },
]

const settings = [
  { id: "1", icon: VscGraph, name: 'Statistic Analysis', unavailable: false },
  { id: "2", icon: LiaMapMarkedAltSolid, name: 'Map Introduction', unavailable: false },
  { id: "3", icon: BiConversation, name: 'Discussion', unavailable: false },
  { id: "4", icon: CiBrightnessUp, name: 'Benedict Kessler', unavailable: true },
  { id: "5", icon: BiSearchAlt2, name: 'Katelyn Rohan', unavailable: false },
]







export default function Flex() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [example, setExample] = useState('');
  const [generatingExample, setGeneratingExample] = useState(false);

  const onButtonSettings = () => {
    console.log('ButtonSettings clicked.');
  };

  const onButton1 = () => {
    console.log('Button1 clicked.');
  };
  const onButton2 = () => {
    console.log('Button2 clicked.');
  }
  const onButton3 = () => {
    console.log('Button3 clicked.');
  };

  const onSubmit = async () => {
    console.log('Submit clicked');
    try {
      const response = await fetch('https://chatapi.lyu.ai/api/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: answer
          })
        });
      const res = await response.json();
      console.log('text', res.text);
      setResult(res.text);
    } catch (error) {
      console.error('Error fetching HTML:', error);
    }
  };

  const onAnswerChange = (e: any) => {
    setAnswer(e.target.value);
  }

  const onLoadQuestion = async (id: string) => {
    console.log('onLoadQuestion', id);
    try {
      const response = await fetch(`/questions/${id}.html`);
      const html = await response.text();
      setQuestion(html);
      console.log('html', html);
    } catch (error) {
      console.error('Error fetching HTML:', error);
    }
  }

  const onExample = async () => {
    console.log('Example clicked');
    try {
      setGeneratingExample(true);
      const response = await fetch('https://chatapi.lyu.ai/api/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            text: `Please act as an IELTS examiner, based on this question: ${question} (you can ignore the images), provide an example of answer with score 8 criteria.
            If no question provided, please give your own question and then generate example answer for this question.
            `
          })
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





  return (
    <div className="flex w-full items-center h-screen bg-base-200 gap-2 p-2">
      <div className="left-pane flex flex-col w-1/2 h-full gap-2">
        <div className="flex flex-col w-full h-1/2">
          <div className="text-base-content bg-base-100 w-full flex items-center h-14 rounded-t-md p-1 gap-1">

            <button onClick={onButtonSettings} className="btn btn-circle btn-sm btn-ghost">
              <AiOutlineSetting className="w-6 h-6" />
            </button>

            <button onClick={onButton1} className="btn btn-sm btn-sm btn-ghost">
              <BiSearchAlt2 className="w-6 h-6" />Find
            </button>


            <button onClick={onButton2} className="btn btn-sm btn-sm items-center btn-ghost">
              <GiPerspectiveDiceSixFacesRandom className="w-7 h-7" />Random
            </button>

            <button onClick={onButton3} className="btn btn-sm btn-sm btn-ghost items-center">
              <AiFillFolderOpen className="w-6 h-6" />
            </button>


            <Popover className="relative">
              <Popover.Button className="w-48 h-9 outline-none hover:bg-neutral-focus rounded-md onClick=bg-neutral">Question Types</Popover.Button>


              <Popover.Panel className="absolute z-60 w-full">
                <div className="flex flex-col bg-base-100 gap-2 rounded-md shadow">
                  {people.map(({ id, icon: Icon, name }) => (
                    <div key={id} className="hover:bg-neutral-focus p-2 gap-2 flex items-center" onClick={() => onLoadQuestion(id)}>
                      <Icon className="w-5 h-5" />
                      {name}
                    </div>
                  ))}
                </div>
                <div className='text-base-content w-full h-[82%]'> </div>


                <img src="/solutions.jpg" alt="" />
              </Popover.Panel>
            </Popover>

          </div>
          <div className="bg-gray-800 w-full h-full rounded-b-md text-gray-300 p-4 overflow-y-auto" dangerouslySetInnerHTML={{ __html: question }}>
          </div>
        </div>

        <div className="flex flex-col w-full h-1/2 bg-gray-800 gap-2 rounded-md">
          <textarea value={answer} onChange={onAnswerChange} placeholder="Please start to write..." className="h-full bg-gray-800 rounded-md text-gray-300 p-3 resize-none" />
          <button onClick={onSubmit} className="btn btn-sm btn-block btn-base-100 w-15 h-15">Submit</button>
        </div>

      </div>
      <div className="right-pane flex  flex-col w-1/2 h-full gap-2">
        <div className="flex bg-gray-800 w-full h-1/2 rounded-md text-secondary justify-center overflow-y-auto p-2">{result || 'Results'}</div>
        <div className="flex flex-col bg-gray-800 w-full h-1/2 rounded-md text-base-content justify-center items-center p-2 gap-2 overflow-y-auto">
          <div>{example}</div>
          <button onClick={onExample} className="btn btn-outline btn-glass">
            {generatingExample && <div className="loading loading-spinner loading-sm" />}
            Generate Example</button>
        </div>
      </div>
    </div>
  );
}
