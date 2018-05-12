import { LinkedResourceContainer } from "link-redux";
import { TableBody, TableCell, TableHead, Typography } from "material-ui";
import * as React from "react";

import { ArticleTable } from "../topologies/ArticleTable";

export const PropertyArticleTable = (cells, label) => ({ prop }) => (
    <React.Fragment>
        <Typography variant="display1">{label.term}</Typography>
        <ArticleTable>
            <TableHead>
                {cells.map((c) => <TableCell key={c.value}>{c.term}</TableCell>)}
            </TableHead>
            <TableBody>
                {prop.map((cs) => (
                    <LinkedResourceContainer
                        cells={cells}
                        key={cs.value}
                        subject={cs}
                    />
                ))}
            </TableBody>
        </ArticleTable>
    </React.Fragment>
);
