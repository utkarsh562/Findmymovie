import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import AnimFilm from '../components/AnimFilm'
import Spacer from '../components/Spacer'
import SliderContent from '../components/SliderContent'
import SeoComponent from '../components/SeoComponent'
import { idToPoster, isMobile, imdbToMovie } from '../helpers'
import { Row, Col, Icon, Button, Rate, Tag } from 'antd'
import ReadMoreReact from 'read-more-react';
import Share from '../components/Share'


function FavoritesContainer({ movies, route }) {
  const { match } = route
  const urlQuery = (match && match.params) ? window.atob(match.params.q) : null
  const [detail, setDetail] = useState([])

  const linkToSearch = (text) => {
    if (!text) return

    if (Array.isArray(text)) {
        return text.map((a, i) => <Link
            key={a + i}
            to={'/collection/' + a}>
            <Tag
                style={{
                    fontWeight: 900,
                    fontSize: '13px',
                    lineHeight: '13px',
                    margin: '5px', padding: '5px',
                    cursor: 'pointer'
                }}>
                <Icon
                    type="search"
                    style={{
                        color: 'rgba(0,0,0,.2)'
                    }} /> {a}
            </Tag>
        </Link>)
    }

    return <span className={'detail-tags'}><Link to={'/collection/'+text}><Icon type="search" /> {text}</Link> </span>

  }
  

  useEffect(() => {
    if (urlQuery) {
      const theMovie = movies.filter((m) => urlQuery === m.imdb)[0]
      setDetail(theMovie)
    }   
  }, [movies, urlQuery])
  
    const { title, year, runtime, director, writers, stars, genre, rating, wiki, story, related, imdb, identifier } = detail || {}
    const interestedBy = imdbToMovie(related, movies)
    const interestedByTitles = interestedBy ? interestedBy.map(t => t.title) : []

  return (
      <div style={{ width: '100%' }}>
          <SeoComponent
              title={'🎥 🍿 ' + title + ' by ' + director}
              description={story ? story.slice(0, 100) + '...' : ''}
              image={idToPoster(identifier)}
          />
          <div className={'page-border-top'} style={{ zIndex: 3 }} />

          {identifier ? (
              <div
                  style={{
                      backgroundImage: `url(${idToPoster(detail.identifier)})`,
                  }}
                  className={'detail-bg'}
              />
          ) : null}

          <div
              style={{
                  position: 'fixed',
                  zIndex: 2,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  width: '100vw',
                  height: '100vh',
                  top: 0,
                  overflowY: 'scroll',
              }}
          >
              {(isMobile && identifier) && <div className={'background-parallex'} style={{backgroundImage:`url(${idToPoster(identifier)})`}}></div>}
              
              <div style={{ margin: '7vw' }}>
                  {!detail && <AnimFilm />}
                  

                  {detail && detail.identifier ? (
                      <Row gutter={16}>
                          
                          {isMobile ? (
                              <Spacer top={'3vh'} />
                          ) : (
                              <Col span={8}>
                                  <div>
                                      <SliderContent data={detail} isDetail />
                                  </div>
                              </Col>
                          )}

                          <Col
                              xs={24}
                              sm={24}
                              md={isMobile ? 24 : 12}
                              lg={isMobile ? 24 : 12}
                              xl={10}
                          >
                              <div>
                                  <h1
                                      style={{
                                          color: 'white',
                                          fontSize: '35px',
                                      }}
                                  >
                                      {title}
                                      <div
                                          style={{
                                              float: 'right',
                                              marginTop: '-20px',
                                          }}
                                      >
                                          <Rate
                                              character={<Icon type="heart" />}
                                              disabled
                                              defaultValue={Math.abs(
                                                  rating / 2
                                              )}
                                          />
                                      </div>
                                  </h1>
                              </div>

                              {isMobile && (
                                  <div>
                                      <Spacer bottom={'5vh'} />
                                      <Link
                                          to={
                                              title
                                                  ? '/watch/' +
                                                    window.btoa(imdb)
                                                  : null
                                          }
                                      >
                                          <Button
                                              type="primary"
                                              block
                                              icon="caret-right"
                                              size={'large'}
                                          >
                                              Play
                                          </Button>
                                      </Link>
                                      <Spacer bottom={'5vh'} />
                                  </div>
                              )}

                              <div style={{ display: 'flex' }}>
                                  <p style={{ fontWeight: 900 }}>
                                      {linkToSearch(year)}{' '}
                                      <span
                                          style={{
                                              paddingRight: '30px',
                                              display: 'inline',
                                          }}
                                      />{' '}
                                      {runtime}{' '}
                                  </p>
                              </div>

                              <div
                                  style={{
                                      textAlign: 'justify',
                                      fontSize: '15px',
                                      lineHeight: '22px',
                                      fontWeight: '100',
                                      paddingBottom: '20px',
                                  }}
                              >
                                  <ReadMoreReact
                                      min={200}
                                      ideal={500}
                                      max={700}
                                      text={story}
                                  />
                              </div>
                              {
                                stars &&  <p>
                                <span style={{fontWeight:900}}>Starring</span>:{' '}
                                { linkToSearch(stars) }
                            </p>
                              }
                             
                              {
                                genre && genre[0] &&   <p>
                                <span style={{fontWeight:900}}>Genres</span>:{' '}
                                {linkToSearch(genre)}
                                </p>
                                  
                              }
                              
                              {
                                writers && <p>
                                <span style={{fontWeight:900}}>Writers</span>:{' '}
                                {  linkToSearch(writers) }
                            </p>
                              }
                              
                              {
                                director &&  <p>
                                <span style={{fontWeight:900}}>Director</span>:{' '}
                                { linkToSearch(director)}
                            </p> 
                                  
                              }

                              { interestedByTitles && 
                                <p>
                                <span style={{fontWeight:900}}>Related</span>:{' '}
                                {linkToSearch(interestedByTitles)}
                            </p>
                              }
                             
                              
                              <p>
                                  <span style={{fontWeight:900}}>Sources</span>:{' '}
                                  <span
                                      style={{
                                          paddingRight: '5px',
                                          display: 'inline',
                                      }}
                                  />
                                  <a
                                      href={
                                          'https://archive.org/details/' +
                                          detail.identifier
                                      }
                                      target="_Blank"
                                      rel="noopener noreferrer nofollow no-follow"
                                      className={'detail-tags'}
                                  >
                                      Archive.org
                                  </a>
                                  <span
                                      style={{
                                          paddingRight: '10px',
                                          display: 'inline',
                                      }}
                                  />
                                  <a
                                      href={
                                          'https://www.wikidata.org/wiki/' +
                                          wiki
                                      }
                                      target="_Blank"
                                      rel="noopener noreferrer nofollow no-follow"
                                      className={'detail-tags'}
                                  >
                                      WikiData
                                  </a>
                                  <span
                                      style={{
                                          paddingRight: '10px',
                                          display: 'inline',
                                      }}
                                  />
                                  <a
                                      href={
                                          'https://www.wikidata.org/wiki/' +
                                          wiki
                                      }
                                      target="_Blank"
                                      rel="noopener noreferrer nofollow no-follow"
                                      className={'detail-tags'}
                                  >
                                      Wikipedia
                                  </a>
                                  <span
                                      style={{
                                          paddingRight: '10px',
                                          display: 'inline',
                                      }}
                                  />
                                  <a
                                      href={
                                          'https://www.imdb.com/title/' + imdb
                                      }
                                      target="_Blank"
                                      rel="noopener noreferrer nofollow no-follow"
                                      className={'detail-tags'}
                                  >
                                      IMDB
                                  </a>
                              </p>

                              <Spacer bottom={'50px'} />
                              <Link
                                  to={
                                      title
                                          ? '/watch/' + window.btoa(imdb)
                                          : null
                                  }
                              >
                                  <Button
                                      type="primary"
                                      block
                                      icon="caret-right"
                                      size={'large'}
                                  >
                                      Play
                                  </Button>
                              </Link>
                              <Spacer top={'30px'}/>
                              <Share />

                              {isMobile ? (
                                  <Spacer bottom={'25vh'} />
                              ) : (
                                  <Spacer bottom={'10vh'} />
                              )}
                          </Col>
                      </Row>
                  ) : null}
              </div>
          </div>
      </div>
  )
}

const mapStateToProps = state => ({
  ...state
})
 
const mapDispatchToProps = dispatch => ({
  //addFile: file => dispatch(addFile(file))
 })

 export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
