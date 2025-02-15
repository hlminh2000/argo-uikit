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

import React from 'react';
import { css } from '@icgc-argo/uikit';
import DefaultLayout from './DefaultLayout';
import Typography from '@icgc-argo/uikit/Typography';
import TitleBorder from '@icgc-argo/uikit/TitleBorder';
import { ThemeColorNames } from '@icgc-argo/uikit/theme/types';
import { Row, Col } from 'react-grid-system';
import chunk from 'lodash/chunk';
import get from 'lodash/get';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import Head from 'components/pages/head';

type Member = { name: string; title?: string };
type Team = { title: string; members: Array<Member>; color: keyof ThemeColorNames };

const teamData: Array<Team> = [
  {
    title: 'Leaders',
    members: [
      { name: 'Lincoln Stein', title: 'Head of Adaptive Oncology, OICR' },
      { name: 'Melanie Courtot', title: 'Director of Genome Informatics, OICR' },
    ],
    color: 'accent1',
  },
  {
    title: 'Bioinformatics and Data Curation',
    members: [{ name: 'Hardeep Nahal-Bose' }, { name: 'Linda Xiang' }, { name: 'Edmund Su' }],
    color: 'accent3',
  },
  {
    title: 'Software Engineering',
    members: [
      { name: 'Brandon Chan', title: 'Senior Technical Business Analyst' },
      { name: 'Jon Eubank', title: 'Software Architect, Team Lead' },
      { name: 'Kim Cullion', title: 'Senior UX/UI Designer' },
      { name: 'Alexis Li' },
      { name: 'Ann Catton' },
      { name: 'Bashar Allabadi' },
      { name: 'Ciaran Schutte' },
      { name: 'Dan DeMaria' },
      { name: 'Henrich Feher' },
      { name: 'Jared Baker' },
      { name: 'Jaser Uddin' },
      { name: 'Justin Richardsson' },
      { name: 'Rakesh Mistry' },
      { name: 'Sam Rich' },
      { name: 'Yelizar Alturmessov' },
    ],
    color: 'accent4',
  },
  {
    title: 'Research IT',
    members: [
      { name: 'David Sutton', title: 'Director IT and Information Security Officer, OICR' },
      { name: 'Bob Gibson' },
      { name: 'Gino Yearwood' },
      { name: 'Miki Wong' },
    ],
    color: 'secondary',
  },
  {
    title: 'Alumni',
    members: [
      { name: 'Atul Kachru', title: 'Senior Project Manager' },
      { name: 'Christina Yung', title: 'Director of Genome Informatics, OICR' },
      { name: 'Dusan Andric', title: 'Software Architect, Team Lead' },
      { name: 'Rosi Bajari', title: 'Senior Technical Business Analyst' },
      { name: 'Junjun Zhang', title: 'Lead Bioinformatician' },
      { name: 'Aleks Pejovic' },
      { name: 'Alex Lepsa' },
      { name: 'Kevin Hartmann' },
      { name: 'Minh Ha' },
      { name: 'Priyonto Saha' },
      { name: 'Robert Tisma' },
      { name: 'Wajiha Shah' },
      { name: 'Xu Deng' },
    ],
    color: 'accent3',
  },
];

const SectionTitle = (props) => (
  <Typography
    css={css`
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 15px;
    `}
    variant="subtitle"
    {...props}
  />
);

export default function TeamPage() {
  const theme = useTheme();
  return (
    <DefaultLayout>
      <Head subtitle="The Team"></Head>
      <div
        css={css`
          background: ${theme.colors.white};
          padding-bottom: 25px;
        `}
      >
        <div
          css={css`
            height: 140px;
            display: flex;
            align-items: center;
            background-image: url('/images/icgc-galaxy-bg.jpg');
            background-position: center;
            background-size: cover;
            margin-bottom: 36px;
            padding: 0 10vw;
          `}
        >
          <Typography variant="hero" color="white">
            {' '}
            The ICGC ARGO DCC Team
          </Typography>
        </div>

        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 0 10vw;
          `}
        >
          {teamData.map((team, i) => (
            <div key={i}>
              <SectionTitle>{team.title}</SectionTitle>
              <TitleBorder color={team.color} width="86px" />

              <Row>
                {chunk(team.members, 6).map((col, i, arr) => (
                  <Col
                    key={i}
                    css={css`
                      max-width: 330px;
                    `}
                    sm={12}
                    md={arr.length === 1 ? 12 : 12 / arr.length}
                  >
                    <Typography
                      variant="paragraph"
                      css={css`
                        line-height: 1.71;
                      `}
                    >
                      {col.map((member, i) => {
                        const title = get(member, 'title', false);
                        return (
                          <span
                            key={i}
                            css={css`
                              display: flex;
                              flex-wrap: wrap;
                            `}
                          >
                            <Typography variant="paragraph2" bold>
                              {`${member.name}${title ? ',\u00A0' : ''}`}
                            </Typography>
                            <span
                              css={css`
                                flex-grow: 1;
                              `}
                            >
                              {title ? `${member.title}` : null}
                            </span>
                          </span>
                        );
                      })}
                    </Typography>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
