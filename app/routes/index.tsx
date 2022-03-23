import {
  Anchor,
  Badge,
  Container,
  Header,
  Popover,
  Table,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useLoaderData } from "remix";
import { getMergeRequests } from "~/gitlab/merge-requests.server";
import { MergeRequestLevelMergeRequestApproval } from "~/gitlab/types/merge-request-approval";

export const loader = async () => {
  return getMergeRequests();
};

export default function Index() {
  const mergeRequests = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  const rows = mergeRequests.map((mr) => (
    <tr key={mr.id}>
      <td>{mr.author.name}</td>
      <td>
        <Anchor
          href={mr.project.http_url_to_repo}
          target="_blank"
          rel="noreferrer"
        >
          {mr.project.name}
        </Anchor>
      </td>
      <td>
        <Anchor href={mr.web_url} target="_blank" rel="noreferrer">
          {mr.title}
        </Anchor>

        <div>{Approvals(mr.approvals)}</div>
      </td>
    </tr>
  ));

  return (
    <Container size={"lg"}>
      <Header height={70} p="md">
        {/* Handle other responsive styles with MediaQuery component or createStyles function */}
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Text>MR UI</Text>
        </div>
      </Header>

      {rows.length > 0 ? (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Author</th>
              <th>Project</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : null}
    </Container>
  );
}

function Approvals(approval: MergeRequestLevelMergeRequestApproval) {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
      placement="center"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      transition="pop-top-left"
      width={260}
      styles={{ body: { pointerEvents: "none" } }}
      target={
        <Badge
          onMouseEnter={() => {
            if ((approval.approved_by ?? []).length > 0) {
              setOpened(true);
            }
          }}
          onMouseLeave={() => setOpened(false)}
        >
          {`${approval.approvals_required - approval.approvals_left} / ${
            approval.approvals_required
          }`}{" "}
          ✔
        </Badge>
      }
    >
      {(approval.approved_by ?? []).length > 0 ? (
        <Text size="sm">
          <div style={{ display: "flex" }}>
            {(approval.approved_by ?? [])
              .map((approver) => approver.user.name)
              .join(", ")}
          </div>
        </Text>
      ) : null}
    </Popover>
  );
}
