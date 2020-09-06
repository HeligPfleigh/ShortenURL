import MaterialTable, { Icons } from "material-table";
import { forwardRef } from "react";
import useSWR from "swr";
import { formatDistance } from "date-fns";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
import { getLinks } from "../api";
import { server } from "../config";

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

interface IURLTableProps {
  onCopy: (url: string) => void;
}

export default function URLTable({ onCopy }: IURLTableProps) {
  const { data } = useSWR("/api/user", getLinks);

  const handleCopy = (_e: Event, rowData: any) => {
    const { shortUrl } = rowData;
    onCopy(shortUrl);
  };

  const displayData = (data?.data || []).map(
    ({ originalUrl, shortUrl, createdAt, clickCount }: any) => ({
      originalUrl,
      shortUrl: `${server}${shortUrl}`,
      clickCount,
      createdAt: formatDistance(new Date(), new Date(createdAt)),
    })
  );
  return (
    <MaterialTable
      title="List shotened URLs"
      icons={tableIcons}
      columns={[
        { title: "Original URL", field: "originalUrl" },
        { title: "Shorten URL", field: "shortUrl" },
        { title: "Created", field: "createdAt" },
        { title: "Clicks", field: "clickCount", type: "numeric" },
      ]}
      data={displayData}
      actions={[
        {
          icon: () => <FileCopyTwoToneIcon />,
          tooltip: "Copy",
          onClick: handleCopy,
        },
      ]}
      options={{
        actionsColumnIndex: -1,
        draggable: false,
      }}
    />
  );
}
