import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
import { Tabs, TabsContent, TabsList } from "./ui/tabs";

export function IsLoading() {
  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
          <Skeleton className='h-8 w-40' />
      </CardHeader>
      <CardContent>
          <Tabs>
            <TabsList className='grid w-full grid-cols-2'>
              <Skeleton className='h-8 w-24' />
              <Skeleton className='h-8 w-24' />
            </TabsList>
            <TabsContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><Skeleton className='h-4 w-full' /></TableHead>
                    <TableHead><Skeleton className='h-4 w-full' /></TableHead>
                    <TableHead><Skeleton className='h-4 w-full' /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className='h-4 w-full' /></TableCell>
                      <TableCell><Skeleton className='h-4 w-full' /></TableCell>
                      <TableCell><Skeleton className='h-4 w-full' /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
      </CardContent>
    </Card>
  )
}