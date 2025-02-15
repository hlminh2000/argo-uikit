/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { css } from '@icgc-argo/uikit';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import Typography from '@icgc-argo/uikit/Typography';
import Icon from '@icgc-argo/uikit/Icon';

const SelectedIds = ({ ids = [], onRemove }: { ids: string[]; onRemove: (id: string) => void }) => {
  const theme = useTheme();
  return (
    <ul
      css={css`
        padding-inline-start: 0px;
        margin: 0 0 5px 5px;
      `}
    >
      {ids.map((id) => (
        <li
          key={id}
          css={css`
            list-style-type: none;
          `}
        >
          <Typography
            color={theme.colors.secondary}
            css={css`
              font-size: 11px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin: 2px 0;
            `}
          >
            <Icon
              name="times"
              fill={theme.colors.secondary}
              title="Remove"
              css={css`
                padding-right: 5px;
                padding-bottom: 1px;
                width: 8px;
                height: 8px;
                cursor: pointer;
              `}
              onClick={() => onRemove(id)}
            />
            {id}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default SelectedIds;
