import React from 'react';

const Tasks_Table = () => {
  return (
    <div>
      <table>
        <caption class="caption-bottom">
          Table 3.1: Professional wrestlers and their signature moves.
        </caption>
        <thead>
          <tr>
            <th>Wrestler</th>
            <th>Signature Move(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"Stone Cold" Steve Austin</td>
            <td>Stone Cold Stunner, Lou Thesz Press</td>
          </tr>
          <tr>
            <td>Bret "The Hitman" Hart</td>
            <td>The Sharpshooter</td>
          </tr>
          <tr>
            <td>Razor Ramon</td>
            <td>Razor's Edge, Fallaway Slam</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tasks_Table;