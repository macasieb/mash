import { Type } from "link-redux";
import * as React from "react";

import { InfoListSectionTopology } from "../../topologies";
import InfoListItemText from "../../components/InfoListItemText";

import { ArticleBase } from "./ArticleBase";

export class ThingInfoListSection extends ArticleBase {
  public static topology = InfoListSectionTopology;

  public render() {
    return (
      <InfoListItemText>
        <Type />
      </InfoListItemText>
    );
  }
}
