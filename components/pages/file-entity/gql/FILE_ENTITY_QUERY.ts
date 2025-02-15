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

import { gql } from '@apollo/client';

const FILE_ENTITY_QUERY = gql`
  query FileEntity($filters: JSON) {
    file {
      hits(filters: $filters) {
        total
        edges {
          node {
            object_id
            file_id
            data_category
            data_type
            file_type
            file_access
            study_id
            analysis_tools
            embargo_stage
            metrics {
              average_insert_size
              average_length
              duplicated_bases
              error_rate
              mapped_bases_cigar
              mapped_reads
              mismatch_bases
              paired_reads
              pairs_on_different_chromosomes
              properly_paired_reads
              total_bases
              total_reads
            }

            file {
              size
              md5sum
              name
            }

            repositories {
              hits {
                edges {
                  node {
                    country
                    name
                  }
                }
              }
            }

            analysis {
              experiment {
                experimental_strategy
                platform
              }

              workflow {
                workflow_name
                workflow_version
              }
              analysis_type
              analysis_version
              variant_class
            }

            donors {
              hits {
                edges {
                  node {
                    donor_id
                    submitter_donor_id
                    specimens {
                      hits {
                        edges {
                          node {
                            specimen_tissue_source
                            specimen_type
                            tumour_normal_designation
                            submitter_specimen_id
                            specimen_id
                            samples {
                              hits {
                                edges {
                                  node {
                                    matched_normal_submitter_sample_id
                                    sample_id
                                    sample_type
                                    submitter_sample_id
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default FILE_ENTITY_QUERY;
