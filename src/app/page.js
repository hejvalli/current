import Image from 'next/image'
import Link from 'next/link';
import {getData} from './pages/api/api';

 
export default async function Page() {
  const data = await getData();
 
  return <main></main>;
}
