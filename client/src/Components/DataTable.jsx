import { Table } from "flowbite-react";

function DataTable({ list }) {
  // console.log(list)
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Sold</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell className="w-10">Description</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {list?.map((transaction, index) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {transaction.id}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium dark:text-white">{transaction.title}</Table.Cell>
                <Table.Cell>{transaction.price}</Table.Cell>
                <Table.Cell>{transaction.category}</Table.Cell> 
                <Table.Cell>{transaction.sold?"Yes":"No"}</Table.Cell>
                <Table.Cell>{transaction.image}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{transaction.description}</Table.Cell>
              </Table.Row>
            );
          })}

         
        </Table.Body>
      </Table>
    </div>
  );
}

export default DataTable;
