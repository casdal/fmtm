import * as React from 'react';
import CustomizedImage from '@/utilities/CustomizedImage';
import CustomizedProgressBar from '@/utilities/CustomizedProgressBar';
import { HomeActions } from '@/store/slices/HomeSlice';
import { projectType } from '@/models/home/homeModel';
import CoreModules from '@/shared/CoreModules';
import AssetModules from '@/shared/AssetModules';
import { useAppSelector } from '@/types/reduxTypes';

//Explore Project Card Model to be rendered in home view
export default function ExploreProjectCard({ data }: { data: projectType }) {
  const navigate = CoreModules.useNavigate();
  const dispatch = CoreModules.useAppDispatch();

  const [shadowBox, setShadowBox] = React.useState<number>(0);
  const defaultTheme = useAppSelector((state) => state.theme.hotTheme);

  //on mounse enter an Element set shadow to 3
  const onHoverIn = () => {
    setShadowBox(3);
  };
  //on mounse enter an Element set shadow to default
  const onHoverOut = () => {
    setShadowBox(0);
  };

  //Inline styles mainly for overidding css
  const cardInnerStyles: any = {
    outlinedButton: {
      width: 70,
      height: 22,
      marginTop: '5%',
      position: 'absolute',
      fontFamily: defaultTheme.typography.h3.fontFamily,
      right: 6,
      borderRadius: '0px',
    },
    card: {
      marginLeft: '0.1%',
      marginRight: '0.1%',
      marginTop: '0.7%',
      width: `${100}%`,
      cursor: 'pointer',
      opacity: 0.9,
      position: 'relative',
    },
    location: {
      icon: {
        fontSize: 22,
      },
    },
    button: {
      marginTop: '1rem',
      marginLeft: '2%',
      padding: '0.5rem 1rem',
      fontSize: defaultTheme.typography.h5.fontSize,
      fontWeight: 'bold',
    },
  };

  return (
    <CoreModules.Card
      onClick={() => {
        const project: projectType = data;
        dispatch(HomeActions.SetSelectedProject(project));
        navigate(`/project/${data.id}`);
      }}
      style={cardInnerStyles.card}
      sx={{ boxShadow: 0 }}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      className="hover:fmtm-bg-red-50 hover:fmtm-shadow-xl fmtm-duration-500 fmtm-rounded-lg fmtm-border-[1px] fmtm-border-solid fmtm-border-[#706E6E] fmtm-bg-white fmtm-min-h-[22.5rem]"
    >
      <CoreModules.CardContent className="fmtm-h-full" style={{ padding: '16px' }}>
        <div className="fmtm-flex fmtm-flex-col fmtm-justify-between fmtm-h-full">
          <div>
            <div className="fmtm-flex fmtm-justify-between">
              {data.organisation_logo ? (
                <div className="fmtm-h-[50px]">
                  <CoreModules.CardMedia component="img" src={data.organisation_logo} sx={{ height: 50 }} />
                </div>
              ) : (
                <CustomizedImage status={'card'} style={{ width: 50, height: 50 }} />
              )}
              <CoreModules.Typography variant="h4" right={7} top={5} gutterBottom>
                #{data.id}
              </CoreModules.Typography>
            </div>

            {/*Project Info and description*/}
            <CoreModules.Stack direction={'column'} minHeight={190} mt={'2%'} justifyContent={'left'}>
              <p
                className="fmtm-line-clamp-3 fmtm-text-xl fmtm-capitalize fmtm-font-bold fmtm-ml-[2%] fmtm-mt-[5%]"
                title={data.name}
              >
                {data.name}
              </p>

              <p
                className="fmtm-capitalize fmtm-line-clamp-2 fmtm-ml-[2%] fmtm-mt-[5%] fmtm-text-[#7A7676]"
                title={data.description}
              >
                {data.description}
              </p>
              <div className="fmtm-flex fmtm-items-start fmtm-mt-[1.63rem] fmtm-gap-2">
                <AssetModules.LocationOn color="error" style={cardInnerStyles.location.icon} />
                <p className="fmtm-capitalize fmtm-line-clamp-1 fmtm-text-[#7A7676]" title={data?.location_str}>
                  {data?.location_str}
                </p>
              </div>
            </CoreModules.Stack>
          </div>

          <div>
            {/* Number of Contributors */}
            <CoreModules.Stack direction={'row'}>
              <CoreModules.Typography
                mt={'7%'}
                ml={'2%'}
                variant="h2"
                fontSize={defaultTheme.typography.subtitle1.fontSize}
                fontWeight={'bold'}
                color="info"
              >
                {data.num_contributors}
              </CoreModules.Typography>

              <CoreModules.Typography
                mt={'8%'}
                ml={'2%'}
                variant="h2"
                fontSize={defaultTheme.typography.htmlFontSize}
                color="info"
              >
                contributor{data.num_contributors === 1 ? '' : 's'}
              </CoreModules.Typography>
            </CoreModules.Stack>

            {/* Contribution Progress Bar */}
            <CustomizedProgressBar data={data} height={7} />
          </div>

          {/* Start Mapping Button */}
          <div className="fmtm-mt-[2%] fmtm-mr-[3%]">
            <CoreModules.Button
              variant="contained"
              color="primary"
              style={cardInnerStyles.button}
              onClick={(e) => {
                // Prevent card click
                e.stopPropagation();
                // Redirect without opening new tab
                window.location.href = `/mapnow/${data.id}`;
              }}
            >
              Start Mapping
            </CoreModules.Button>
          </div>
        </div>
      </CoreModules.CardContent>
    </CoreModules.Card>
  );
}
