import { Grid, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
  LinkedResourceContainer,
  Property,
  useLRS,
} from "link-redux";
import * as React from "react";

import { DescriptionProps, NameProps } from "../../helpers/types";
import { NS } from "../../LRS";
import { ArticleTopology } from "../../topologies";
import { GridList } from "../../topologies/GridList";

const useStyles = makeStyles((theme: Theme) => createStyles({
  gridList: {
    width: "100%",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
}));

export const ExtensionsManager = () => {
  const classes = useStyles({});
  const lrs = useLRS();
  const installableComponents = (lrs as any).store.match(
    null,
    NS.rdf.type,
    NS.ll("InstallableComponent"),
  );

  return (
    <Grid
      direction="row"
      justify="flex-start"
    >
      <Typography><Property label={NameProps} /></Typography>
      <Typography><Property label={DescriptionProps} /></Typography>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {installableComponents.map((statement) => (
            <LinkedResourceContainer subject={statement.subject} />
          ))}
        </GridList>
      </div>
    </Grid>
  );
};

ExtensionsManager.type = NS.browser("ExtensionsManager");

ExtensionsManager.topology = ArticleTopology;
