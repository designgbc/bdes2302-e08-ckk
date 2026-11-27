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

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: images } = await supabase.from('images').select()

  return (

    <div className="max-w-7xl mx-auto">

      <Table>
        <TableCaption>List of images and their authors.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {images?.map((image) => (

            <TableRow key={image.id}>
              <TableCell className="font-medium">{image.name}</TableCell>
              <TableCell>
                <img className="h-30 w-30 object-cover mx-auto" src={image.url} />
              </TableCell>
              <TableCell>{image.id}</TableCell>
              <TableCell className="text-right">

                <a
                  href={`/profile/${image.id}`}
                  className={buttonVariants({ variant: "default", size: "sm" })}
                >
                  View Profile
                </a>

              </TableCell>
            </TableRow>

          ))}


        </TableBody>
      </Table>

    </div>


  )
}