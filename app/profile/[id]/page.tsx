export const instant = false;

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page({ params }) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { id } = await params;
  const { data: images } = await supabase.from('images').select().eq("id", id);

  return (

    <div className="md:w-3xl w-full mx-auto px-4 py-4">

          {images?.map((image) => (

            <div key={image.id}>
              <h1 className="font-bold text-2xl mb-3">{image.name}</h1>
              <div>
                <img className="h-50 w-full object-cover mx-auto mb-3" src={image.url} />
              </div>
              <div className="mb-3">{image.bio}</div>
              <div className="text-right">

                <a
                  href={`/`}
                  className={buttonVariants({ variant: "secondary", size: "sm" })}
                >
                  Go back to homepage
                </a>

              </div>
            </div>

          ))}


    </div>


  )
}