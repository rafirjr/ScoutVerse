import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";

const RosterTable: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex">
            <div className="flex-col lg:w-1/4"></div>
            <div className=" bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-5/6 h-fit md:w-3/4 lg:mr-20">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>First Name</Table.HeadCell>
                        <Table.HeadCell>Last Name</Table.HeadCell>
                        <Table.HeadCell>Khoump</Table.HeadCell>
                    </Table.Head>
                </Table>
            </div>
        </div>
    );
};

export default RosterTable;
