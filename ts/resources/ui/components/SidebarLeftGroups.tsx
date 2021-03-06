import React, { useEffect, useState } from 'react';
import SidebarLeftGroupHead from './SidebarLeftGroupHead';
import SidebarLeftLayers from './SidebarLeftLayers';

interface SidebarLeftGroupsProps {
  selection: srm.AppLayer | null;
  hover: srm.AppLayer | null;
  groupSelection: srm.Group;
  groupSelectionNest: srm.Group[] | null;
  notes: srm.Note[];
  setSelection(selection: srm.AppLayer | null): void;
  setHover(hover: srm.AppLayer | null): void;
  setGroupSelection(groupSelection: srm.Group | null): void;
}

const SidebarLeftGroups = (props: SidebarLeftGroupsProps) => {
  const { selection, hover, groupSelection, groupSelectionNest, notes, setSelection, setHover, setGroupSelection } = props;
  const [nestPadding, setNestPadding] = useState<number>(0);
  useEffect(() => {
    if (groupSelectionNest) {
      const groupSelectionIndex = groupSelectionNest.findIndex((group: srm.Group) => {
        return group.id === groupSelection.id;
      });
      setNestPadding(((groupSelectionIndex + 1) * 8) + 8);
    } else {
      setNestPadding(16);
    }
  }, [groupSelectionNest]);
  return (
    <div className='c-sidebar c-sidebar--left'>
      {
        groupSelectionNest
        ? groupSelectionNest.map((group: srm.Group, index: number) => (
            <SidebarLeftGroupHead
              key={index}
              layer={group}
              index={index}
              selection={selection}
              hover={hover}
              groupSelection={groupSelection}
              notes={notes}
              setSelection={setSelection}
              setHover={setHover}
              setGroupSelection={setGroupSelection} />
          ))
        : null
      }
      <SidebarLeftLayers
        layers={groupSelection.layers as srm.AppArtboardLayer[]}
        nestPadding={nestPadding}
        selection={selection}
        hover={hover}
        notes={notes}
        setSelection={setSelection}
        setHover={setHover}
        setGroupSelection={setGroupSelection} />
    </div>
  )
};

export default SidebarLeftGroups;